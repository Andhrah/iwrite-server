import { ApolloServer } from 'apollo-server';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import { env } from './helpers/utils';
import logger from './helpers/logger';

import typeDefs from './schema/schema';
import resolvers from './resolvers/resolver';

dotenv.config();

const port = env('PORT', 4000);

const { JWT_SECRET } = process.env;

const getUser = token => {
  try {
    if (token) {
      return jwt.verify(token, JWT_SECRET);
    }
    return null;
  } catch (error) {
    return null;
  }
};
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => {
    const token = req.get('Authorization') || '';
    return { user: getUser(token.replace('Bearer', '')), req, res };
  },
  introspection: true,
  playground: true
});

server.listen(port, () => logger.log(`🚀 Server is running at http://localhost:${port}`));
