'use server';

import { axiosClient } from './axiosClient';

export const getClients = async (entities: string = '') => {
  const response = await axiosClient.get(`/clients`, {
    params: {
      entities,
    },
  });
  return response.data;
};
