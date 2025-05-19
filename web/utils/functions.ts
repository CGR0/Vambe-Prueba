import { getClients } from '@/services/clients';
import { getMeetings } from '@/services/meetings';
import { getSellers } from '@/services/sellers';

export const getOriginalData = async () => {
  const clients = await getClients();
  const meetings = await getMeetings();
  const sellers = await getSellers();
  return { clients, meetings, sellers };
};
