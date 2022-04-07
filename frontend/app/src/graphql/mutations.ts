import { gql } from 'apollo-boost';


export const ADD_NEW_CLIENT = gql`

    mutation addNewClient($client: ClientInput!) {
      addNewClient(client: $client) {
        firstName lastName phoneNumber email
      }
    }
`;

// export const DELETE_NAME = gql`
//   mutation deleteNames($id: ID!) {
//     deleteNames(id: $id) {
//       name
//       id
//     }
//   }
// `;

// mutation { createTodo(todo: {title: "Изучить Graphql"}) { title id createdAt } }
