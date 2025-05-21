'use client';

import React, { useEffect, useState } from 'react';
import Chart from '@/components/ui/chart';
import { ChartProps } from '@/utils/types';
import { CustomDropDownMenu } from '@/components/ui/dropDownMenu';
import { Paper, Typography } from '@mui/material';

interface ChartGroupProps {
  charts: ChartProps[];
  title: string;
}

export default function ChartGroup({ charts, title }: ChartGroupProps) {
  const [currentChart, setCurrentChart] = useState<ChartProps>();

  useEffect(() => {
    setCurrentChart(charts[0]);
  }, [charts]);

  return (
    <Paper elevation={4} className="flex flex-col gap-5 p-5 rounded-3xl">
      <Typography variant="h5" className="text-center">
        {title}
      </Typography>
      <CustomDropDownMenu
        className="w-80"
        options={charts.map((chart) => ({
          title: chart.title || '',
          value: chart,
        }))}
        onSelect={(option) => setCurrentChart(option)}
        selectedValue={currentChart?.title || ''}
      />
      {currentChart && (
        <div key={currentChart.title}>
          <Chart
            dataset={currentChart.dataset}
            type={currentChart.type}
            horizontal={currentChart.horizontal}
            preLoadedSeries={currentChart.preLoadedSeries}
          />
        </div>
      )}
    </Paper>
  );
}
