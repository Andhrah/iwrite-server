import { gql } from 'apollo-server';

const typeDefs = gql`
  type User {
    id: Int!
    email: String!
  }
  type AuthPayload {
    token: String!
    user: User!
    message: String
  }
  type Query {
    getUser(id: Int!): User
    getAllUsers: [User!]!
    me(id: Int, email: String): User
  }
  type Mutation {
    register(email: String!, password: String!): AuthPayload!
    login (email: String!, password: String!): AuthPayload!
  }`;
export default typeDefs;
