import { register, login } from './auth';
import { createBlog } from './blog';

const resolvers = {
  Query: {},
  Mutation: {
    register,
    login,
    createBlog,
  },
};

export default resolvers;
