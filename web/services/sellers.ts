'use server';

import { axiosClient } from './axiosClient';

export const getSellers = async (entities: string = '') => {
  const response = await axiosClient.get(`/sellers`, {
    params: {
      entities,
    },
  });
  return response.data;
};
