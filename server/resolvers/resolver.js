import { register, login } from './auth';

const resolvers = {
  Query: {},
  Mutation: {
    register,
    login,
  },
};

export default resolvers;
