import axios from 'axios';

const createAxiosClient = (baseURL: string) => {
  const client = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return client;
};

export const axiosClient = createAxiosClient(`${process.env.API_URL}`);
