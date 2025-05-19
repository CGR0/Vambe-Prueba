'use client';

import { Box } from '@mui/material';
import { MenuItem } from '@mui/material';
import { TextField } from '@mui/material';
import { ChartContainer, BarPlot, LinePlot, ChartsXAxis } from '@mui/x-charts';
import { useState } from 'react';
export default function Chart({ series }: { series: any }) {
  const [type, setType] = useState<'line' | 'bar'>('line');

  return (
    <Box sx={{ width: '100%' }}>
      <TextField
        select
        value={type}
        onChange={(event) => setType(event.target.value as 'line' | 'bar')}
        label="series type"
        sx={{ minWidth: 150 }}
      >
        <MenuItem value="line">line</MenuItem>
        <MenuItem value="bar">bar</MenuItem>
      </TextField>
      <ChartContainer
        series={series}
        xAxis={[
          {
            data: ['A', 'B', 'C', 'D', 'E'],
            scaleType: 'band',
            id: 'x-axis-id',
            height: 45,
          },
        ]}
        height={200}
      >
        <BarPlot />
        <LinePlot />
        <ChartsXAxis label="X axis" axisId="x-axis-id" />
      </ChartContainer>
    </Box>
  );
}
