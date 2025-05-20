'use client';

import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { ChartProps } from '@/utils/types';
import { Typography } from '@mui/material';

export default function Chart({
  title,
  dataset,
  type,
  horizontal = false,
}: ChartProps) {
  const xAxis: any = [{ data: dataset.map((item) => item.x) }];
  const series = [{ data: dataset.map((item) => item.y) }];

  if (type === 'line') {
    xAxis[0].data = dataset.map((item) => new Date(item.x));
    xAxis[0].scaleType = 'time';
    xAxis[0].min = new Date('2024-01-01');
    xAxis[0].max = new Date('2024-12-01');
    xAxis[0].valueFormatter = (date: Date) => `${date.getMonth() + 1}`;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Typography variant="h6">{title}</Typography>
      {type === 'line' ? (
        <LineChart xAxis={xAxis} series={series} height={400} width={700} />
      ) : (
        <BarChart
          xAxis={xAxis}
          series={series}
          height={400}
          width={700}
          layout={horizontal ? 'horizontal' : 'vertical'}
        />
      )}
    </div>
  );
}
