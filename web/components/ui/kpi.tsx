import { Typography, Paper } from '@mui/material';
import { Gauge } from '@mui/x-charts/Gauge';

export default function Kpi({
  label,
  value,
  maxValue,
  percentage = false,
}: {
  label: string;
  value: number;
  maxValue: number;
  percentage?: boolean;
}) {
  // Ensure values are valid numbers and positive
  const validValue = Math.max(0, Number(value) || 0);
  const validMaxValue = Math.max(1, Number(maxValue) || 1);

  let text = validValue.toString();
  if (percentage) {
    text = `${validValue.toFixed(0)}%`;
  }

  return (
    <Paper
      elevation={4}
      className="flex flex-col items-center gap-2 p-4 rounded-3xl bg-white"
    >
      <Typography variant="h6">{label}</Typography>
      <Gauge
        value={validValue}
        valueMax={validMaxValue}
        startAngle={-110}
        endAngle={110}
        sx={{
          '& .MuiGauge-valueText': {
            fontSize: 37,
            transform: 'translate(0px, -10px)',
          },
        }}
        height={200}
        width={200}
        text={text}
      />
    </Paper>
  );
}
