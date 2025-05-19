'use server';

import { axiosClient } from './axiosClient';

export const getMeetings = async (entities: string = '') => {
  const response = await axiosClient.get(`/meetings`, {
    params: {
      entities,
    },
  });
  return response.data;
};
