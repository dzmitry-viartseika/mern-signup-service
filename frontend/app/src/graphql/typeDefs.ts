import gql from 'graphql-tag';

export default gql`
#  directive @cacheControl(
#    maxAge: Int
#    scope: CacheControlScope
#  ) on FIELD_DEFINITION | OBJECT | INTERFACE
#
#  type Author {
#    name: String!
#  }
#
#  input AuthorInput {
#    name: String!
#  }
#
#  enum CacheControlScope {
#    PUBLIC
#    PRIVATE
#  }
#
#  type Message {
#    _id: ID!
#    text: String!
#    author: Author!
#    date: String!
#  }

    enum Role {
      ADMIN
      CLIENT
    }

    type User {
      phoneNumber: String!
      firstName: String!
      email: String!
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

    type Query {
      getAllUsers: [User!]!
    }

    type Status {
      status: String!
      message: String
    }
`;
