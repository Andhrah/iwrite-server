import { gql } from 'apollo-server';

const typeDefs = gql`
  type User {
    id: Int!
    email: String!
  }
  type Blog {
    id: Int!
  }
  type AuthPayload {
    token: String!
    user: User!
    message: String
  }
  type BlogPayload {
    user: User!
    title: String!
    body: String!
    message: String
  }
  type Query {
    getAllBlogs: [Blog]
    getUser(id: Int!): User
    getAllUsers: [User!]!
    me(id: Int, email: String): User
  }
  type Mutation {
    createBlog(title: String!, body: String!): BlogPayload!
    register(email: String!, password: String!): AuthPayload!
    login (email: String!, password: String!): AuthPayload!
  }`;
export default typeDefs;
