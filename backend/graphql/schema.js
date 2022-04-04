const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type User {
    phoneNumber: String!
    firstName: String!
    email: String!
  }

  type Query {
    getAllUsers: [User!]!
  }
`)
