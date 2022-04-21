import { gql } from 'apollo-boost';

export const GET_ALL_USERS = gql`
  query getAllUsers($input: UserInput) {
    getAllUsers(input: $input) {
      docs {
            phoneNumber
            firstName
            email
            lastName
            role
            _id
      }
      totalDocs
    }
  }
`;
