import { gql } from 'apollo-server';

const typeDefs = gql`
  type User {
    id: Int!
    email: String!
  }
  type Result {
    id: Int!
    title: String!
    body: String!
    image: String
    authorId: Int!
    createdAt: String
    updatedAt: String
  }
  type Blog {
    status: Int!
    result: [Result!]!
    message: String
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
    getAllBlogs: [Blog!]!
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
