'use client';

import { useEffect, useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { ChartProps } from '@/utils/types';
import CustomScatter from './charts/customScatter';
import { getProps } from '@/utils/functions';

export default function Chart({
  dataset,
  type,
  horizontal = false,
  preLoadedSeries,
}: ChartProps) {
  const [props, setProps] = useState<any>({
    height: 400,
    width: 1200,
    layout: horizontal ? ('horizontal' as const) : ('vertical' as const),
    xAxis: [],
    series: [],
  });

  useEffect(() => {
    setProps(getProps({ dataset, type, horizontal, preLoadedSeries }));
  }, [preLoadedSeries]);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {type === 'line' ? (
        <LineChart {...props} />
      ) : type === 'bar' ? (
        <BarChart {...props} />
      ) : (
        <CustomScatter props={props} />
      )}
    </div>
  );
}
