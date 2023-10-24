import resolvers from '@src/resolvers';
import { ApolloServer } from 'apollo-server';

import typeDefs from './type-defs';

const server = new ApolloServer({ resolvers, typeDefs });
server.listen().then(({ url }) => console.info(`Server ready at ${url}. `));
