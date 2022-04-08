import { gql } from 'apollo-boost';


export const ADD_NEW_CLIENT = gql`

    mutation addNewClient($client: ClientInput!) {
      addNewClient(client: $client) {
        firstName lastName phoneNumber email
      }
    }
`;

export const DELETE_CLIENT = gql`

  mutation deleteClient($id: String!) {
    deleteClient(id: $id) {
      status
      message
    }
  }
`;

export const EDIT_CLIENT = gql`

  mutation editClient($id: String!, $client: ClientInput!) {
    editClient(id: $id, client: ClientInput!) {
      firstName lastName phoneNumber email role
    }
  }
`;
