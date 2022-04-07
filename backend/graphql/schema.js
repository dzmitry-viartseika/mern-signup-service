const { buildSchema } = require('graphql');
// TODO: create fragment
module.exports = buildSchema(`
  type User {
    phoneNumber: String!
    firstName: String!
    email: String!
  }

  type Query {
    getAllUsers: [User!]!
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
  }
  
  type Mutation {
    addNewClient(client: ClientInput!): CreateNewUser!
  } 
`)
