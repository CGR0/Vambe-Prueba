import { Paper } from '@mui/material';
import ComercialCharts from './charts/comercialCharts';
import MeetingCharts from './charts/meetingCharts';
import ClientCharts from './charts/clientCharts';

export default function ChartSection() {
  return (
    <Paper className="flex justify-between p-10 gap-10 rounded-3xl shadow-md bg-white">
      <ComercialCharts />
      <MeetingCharts />
      <ClientCharts />
    </Paper>
  );
}
