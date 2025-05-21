'use client';

import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { ChartProps } from '@/utils/types';
import { ScatterChart } from '@mui/x-charts/ScatterChart';

export default function Chart({
  dataset,
  type,
  horizontal = false,
  preLoadedSeries,
}: ChartProps) {
  let xAxis: any;
  let series: any;

  if (preLoadedSeries) {
    series = preLoadedSeries;
  }

  if (type !== 'scatter' && dataset) {
    xAxis = [{ data: dataset.map((item) => item.x) }];
    series = [{ data: dataset.map((item) => item.y) }];
  }

  if (type === 'line' && dataset) {
    xAxis[0].data = dataset.map((item) => new Date(item.x));
    xAxis[0].scaleType = 'time';
    xAxis[0].min = new Date('2024-01-01');
    xAxis[0].max = new Date('2024-12-01');
    xAxis[0].valueFormatter = (date: Date) => `${date.getMonth() + 1}`;
  }

  const props = {
    height: 400,
    width: 1200,
    layout: horizontal ? ('horizontal' as const) : ('vertical' as const),
    xAxis,
    series,
  };

  console.log(props);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {type === 'line' ? (
        <LineChart {...props} />
      ) : type === 'bar' ? (
        <BarChart {...props} />
      ) : (
        <ScatterChart {...props} />
      )}
    </div>
  );
}
