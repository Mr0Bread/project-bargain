const { GraphQLDefinitionsFactory } = require('@nestjs/graphql');
const { join } = require('path')

const definitionsFactory = new GraphQLDefinitionsFactory();
definitionsFactory.generate({
  typePaths: ['./apps/category-service/src/modules/**/*.graphql'],
  path: join(process.cwd(), 'apps/category-service/src/graphql.ts'),
  outputAs: 'interface',
});
