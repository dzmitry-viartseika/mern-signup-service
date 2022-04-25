const { buildSchema } = require('graphql');
// TODO: create fragment
module.exports = buildSchema(`
  type User {
    phoneNumber: String!
    firstName: String!
    email: String!
    lastName: String!
    role: String!
    _id: String!
  }
  
  input UsersFilter {
    role: String,
    searchText: String,
    page: String,
    limit: String,
  }
  
  input UserInput {
    filter: UsersFilter
  }
  
  type ClientsPagination {
    docs: [User],
    totalDocs: Int
    limit: Int
    totalPages: Int
    page: Int
    pagingCounter: Int
    hasPrevPage: Boolean
    hasNextPage: Boolean
    prevPage: Int
    nextPage: Int
  }

  type Query {
    getAllUsers(input: UserInput): ClientsPagination 
  }
  
  input ClientInput {
      firstName: String!
      lastName: String!
      email: String!
      phoneNumber: String!
      role: String!
    }
  
  type CreateNewUser {
    phoneNumber: String!
    firstName: String!
    lastName: String!
    email: String!
    role: String!
    _id: String!
  }
  
  type EditClientType {
    phoneNumber: String!
    firstName: String!
    lastName: String!
    email: String!
    role: String!
  }
  
  type Status {
    status: String!
    message: String!
  }
  
  type Mutation {
    addNewClient(client: ClientInput!): CreateNewUser!
    deleteClient(id: String!): Status!
    editClient(id: String!, client: ClientInput!): Status!
  } 
`)
