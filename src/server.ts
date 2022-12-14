import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';

const typeDef = loadSchemaSync('./**/*.graphql', {
  loaders: [new GraphQLFileLoader()],
});

// The root provides a resolver function for each API endpoint
const root = {
  hello: () => 'Hello world!',
  name: () => 'igor',
  surname: () => 'Pieruccini',
};

const app = express();
app.use('/graphql', graphqlHTTP({
  schema: typeDef,
  rootValue: root,
  graphiql: true,
}));

app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');
