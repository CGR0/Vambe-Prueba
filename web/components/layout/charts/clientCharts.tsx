'use client';

import React from 'react';
import { ChartProps, Meeting } from '../../../utils/types';
import { getScatterData } from '../../../utils/functions';
import ChartGroup from './chartGroup';

export default function ClientCharts({ meetings }: { meetings: Meeting[] }) {
  const charts: ChartProps[] = [
    {
      title: 'Según línea de negocio',
      preLoadedSeries: getScatterData(meetings, 'business_line'),
      type: 'scatter',
    },
    {
      title: 'Según etapa de negocio',
      preLoadedSeries: getScatterData(meetings, 'business_stage'),
      type: 'scatter',
    },
    {
      title: 'Según cómo llegó a Vambe',
      preLoadedSeries: getScatterData(meetings, 'how_came_to_vambe'),
      type: 'scatter',
    },
  ];

  return (
    <ChartGroup
      charts={charts}
      title="Probabilidad de éxito vs consultas diarias"
    />
  );
}
