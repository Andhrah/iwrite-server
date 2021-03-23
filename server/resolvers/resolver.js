import { register, login } from './auth';
import { createBlog, getAllBlogs } from './blog';

const resolvers = {
  Query: {
    getAllBlogs
  },
  Mutation: {
    register,
    login,
    createBlog,
  },
};

export default resolvers;
