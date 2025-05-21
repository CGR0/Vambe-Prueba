import { Paper } from '@mui/material';
import ComercialCharts from './charts/comercialCharts';
import MeetingCharts from './charts/meetingCharts';
import ClientCharts from './charts/clientCharts';
import { useContext } from 'react';
import { DataContext } from '../../hooks/dataContext';

export default function ChartSection() {
  const dataContext = useContext(DataContext);
  if (!dataContext) return null;

  const { filteredData } = dataContext;

  const closedMeetings = filteredData.meetings.filter(
    (meeting) => meeting.closed,
  );

  return (
    <Paper className="flex flex-col justify-between p-10 gap-10 rounded-3xl shadow-md bg-white">
      <ComercialCharts meetings={closedMeetings} />
      <MeetingCharts meetings={filteredData.meetings} />
      <ClientCharts meetings={filteredData.meetings} />
    </Paper>
  );
}
