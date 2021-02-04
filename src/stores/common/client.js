import axios from 'axios';

const client = axios.create({
  timeout: 15000,
  baseURL: 'https://wozmx9dh26.execute-api.eu-west-1.amazonaws.com/api/',
});

export default client;
