const url = 'http://localhost:5000/graphql';
const getAllUsersGraphQl = async () => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'body': JSON.stringify({
        query: `{
          getAllUsers {
            id title done createdAt updatedAt
          }
        }`,
      }),
    },
  };
  const response = await fetch(url, options);
  const text = await response.text();
};

export { getAllUsersGraphQl };
