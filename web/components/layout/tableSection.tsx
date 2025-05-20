import { Paper } from '@mui/material';
import MeetingsTable from './meetingsTable';
export default function TableSection() {
  return (
    <Paper className="flex justify-between p-10 gap-10 rounded-3xl shadow-md bg-white">
      <MeetingsTable />
    </Paper>
  );
}
