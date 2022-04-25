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
      lastName: String!
      email: String!
      role: String!
      _id: String!
    }

    input ClientInput {
      firstName: String!
      lastName: String!
      email: String!
      phoneNumber: String!
      role: String!
    }

    type createNewClient {
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
      message: String
    }

    input UsersFilter {
      role: String,
      searchText: String,
      page: String,
      limit: String
    }

    input UserInput {
      filter: UsersFilter
    }

    type Mutation {
      addNewClient(client: ClientInput!): createNewClient!
      editClient(id: String!, client: ClientInput!): Status!
      deleteClient(id: String!): Status!
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
`;
