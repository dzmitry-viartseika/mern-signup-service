import { gql } from 'apollo-boost';

export const GET_ALL_USERS = gql`
  query getAllUsers($input: UserInput) {
    getAllUsers(input: $input) {
      phoneNumber firstName email _id role lastName
    }
  }
`;
