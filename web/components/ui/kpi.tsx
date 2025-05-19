import { Typography, Paper } from '@mui/material';

export default function Kpi({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <Paper
      elevation={3}
      className="flex flex-col items-center gap-2 p-4 rounded-3xl shadow-md bg-white"
    >
      <Typography variant="h6">{label}</Typography>
      <Typography variant="h4">{value}</Typography>
    </Paper>
  );
}
