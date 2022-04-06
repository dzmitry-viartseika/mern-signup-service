import axios from 'axios';

const API_URL = 'http://localhost:5000/api/graphql';

const $api_graphql = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api_graphql.interceptors.request.use((config) => {
  // eslint-disable-next-line no-param-reassign
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

export default $api_graphql;
