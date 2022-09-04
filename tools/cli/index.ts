import { load } from 'js-yaml'
import { readFileSync } from 'fs'
import { Command, Option } from 'commander'
import { Listr, ListrTask } from 'listr2'
import { join } from 'path'
import { command } from 'execa'

type BargainYaml = {
  services: string[]
  'base-services': {
    [key: string]: {
      launch: {
        type: 'before-all' | 'after-all'
      }
    }
  }
}

type WorkspaceJSON = {
  projects: Record<string, string>
}

type Service = {
  name: string;
  path: string;
}

const cwd = process.cwd()
const program = new Command()

const parseBargainYaml = () => load(readFileSync('Bargain.yaml', 'utf8')) as BargainYaml

const parseWorkspaceJson = () => require('../../workspace.json') as WorkspaceJSON

const getServices = () => {
  const { services } = parseBargainYaml()
  const { projects } = parseWorkspaceJson()

  return services.map(service => ({
    name: service,
    path: join(cwd, projects[service])
  })) as Service[]
}

const getBaseServices = () => {
  const {
    ['base-services']: baseServices
  } = parseBargainYaml()

  return Object
    .entries(baseServices)
    .map(([name, config]) => {
      return {
        name,
        ...config
      }
    }) as {
    name: string
    launch: {
      type: 'before-all' | 'after-all'
    }
  }[]
}

program
  .name('bargain-cli')
  .description('CLI for Project Bargain')
  .version('0.0.1')

program
  .command('config')
  .action(() => {
    console.log(parseBargainYaml())
  })

const network = program.command('network')

network
  .command('create')
  .description('Create a network')
  .action(async () => {
    const tasks = new Listr([
      {
        title: 'Creating network',
        task: async () => {
          await command('docker network create bargain')
        }
      }
    ])
    await tasks.run()
  })

network
  .command('remove')
  .description('Remove a network')
  .action(async () => {
    const tasks = new Listr([
      {
        title: 'Removing network',
        task: async () => {
          await command('docker network rm bargain')
        }
      }
    ])
    await tasks.run()
  })

const services = program.command('services')

services
  .command('up')
  .description('Runs containers of all services')
  .addOption(
    new Option('-b, --build', 'Force rebuild images before starting containers')
  )
  .action(async (options: {
    build: boolean
  }) => {
    const {
      build,
    } = options;
    const tasks: ListrTask[] = []
    const services = getServices()
    const baseServices = getBaseServices()
    const servicesTuRunFirst = baseServices.filter(service => service.launch.type === 'before-all')
    const servicesToRunLast = baseServices.filter(service => service.launch.type === 'after-all')

    if (servicesTuRunFirst.length) {
      tasks.push({
        title: 'Running services before all',
        task: () => new Listr(servicesTuRunFirst.map(service => ({
            title: `Launching ${ service.name }`,
            task: async () => {
              await command(`docker compose up ${ service.name } -d`)
            }
          })),
          {
            concurrent: true
          })
      })
    }

    tasks.push({
      title: 'Starting microservices',
      task: (_, task) => task.newListr(
        services.map(({ path, name }) => {
          return {
            title: `Launching ${ name }`,
            task: async () => {
              await command(
                `docker compose -p project-bargain up -d ${ build ? '--build' : '' }`,
                {
                  cwd: path
                })
            }
          };
        }),
        {
          concurrent: true
        }
      )
    })

    if (servicesToRunLast.length) {
      tasks.push({
        title: 'Running services after all',
        task: () => new Listr(servicesToRunLast.map(service => ({
            title: `Launching ${ service.name }`,
            task: async () => {
              await command(`docker compose up ${ service.name } -d`)
            }
          })),
          {
            concurrent: true
          })
      })
    }

    const listr = new Listr(tasks);

    await listr.run()
  })

services
  .command('down')
  .description('Stops and removes containers')
  .action(async () => {
    const services = getServices();
    const tasks = new Listr([
      {
        title: 'Stopping microservices',
        task: (_, task) => task.newListr(
          services.map(({ path, name }) => {
            return {
              title: `Stopping ${ name }`,
              task: async () => {
                await command('docker compose -p project-bargain down', {
                  cwd: path
                })
              }
            };
          }),
          {
            concurrent: true
          }
        )
      },
      {
        title: 'Stopping base services',
        task: async () => {
          await command('docker compose down --remove-orphans')
        }
      }
    ])

    await tasks.run()
  })

services
  .command('build')
  .description('Builds images')
  .addOption(
    new Option(
      '--services <services...>',
      'Build only specified services'
    )
  )
  .addOption(
    new Option(
      '--no-base',
      'Do not build base services'
    )
  )
  .addOption(
    new Option(
      '--docker',
      'Use docker to build images instead of docker compose'
    )
  )
  .action(async (options: {
    services: string[]
    base: boolean
    docker: boolean
  }) => {
    const {
      docker,
      services,
      base
    } = options;
    const servicesConfig = getServices();
    const tasks: ListrTask[] = [];
    const servicesToBuild = services
      ? servicesConfig.filter(({ name }) => {
        if (!services.includes(name)) {
          console.log(`Skipping ${ name }. Build of this service was not requested`)

          return false
        }

        return true
      })
      : servicesConfig

    if (base) {
      const commandMap = [
        {
          title: 'Building base image for service building',
          commandToRun: 'docker build . -f Dockerfile -t bargain-build'
        },
        {
          title: 'Building base image for service running in production',
          commandToRun: 'docker build . -f Dockerfile-runtime -t bargain-runtime'
        },
        {
          title: 'Building base image for service running in development',
          commandToRun: 'docker build . -f Dockerfile-development -t bargain-dev'
        },
      ];

      tasks.push({
        title: 'Building base images',
        task: async (_, task) => {
          for (const { commandToRun, title } of commandMap) {
            task.title = title
            await command(commandToRun)
          }
        }
      })
    }

    if (!servicesToBuild.length) {
      console.log('No services found to build')

      return
    }

    if (servicesToBuild.length) {
      const serviceBuildCommand = docker ? 'docker build .' : 'docker compose build'

      tasks.push({
        title: 'Building services',
        task: (_, task) => task.newListr(
          servicesToBuild.map(({ path, name }) => {
            return {
              title: `Building ${ name }`,
              task: async () => {
                await command(`${ serviceBuildCommand }`, {
                  cwd: path
                })
              }
            };
          }),
          {
            concurrent: true
          }
        )
      })
    }

    const listr = new Listr(tasks)

    await listr.run()
  })

program.parse(process.argv)
