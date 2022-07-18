const { GraphQLDefinitionsFactory } = require('@nestjs/graphql');
const { join } = require('path')

const definitionsFactory = new GraphQLDefinitionsFactory();
definitionsFactory.generate({
  typePaths: ['./apps/customer-service/src/modules/**/*.graphql'],
  path: join(process.cwd(), 'apps/customer-service/src/graphql.ts'),
  outputAs: 'interface',
});
