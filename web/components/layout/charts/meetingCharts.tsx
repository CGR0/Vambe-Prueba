'use client';

import React from 'react';
import { ChartProps, Meeting } from '@/utils/types';
import { getChartData } from '@/utils/functions';
import ChartGroup from './chartGroup';

export default function MeetingCharts({ meetings }: { meetings: Meeting[] }) {
  const charts: ChartProps[] = [
    {
      title: 'Distribución línea de negocio',
      dataset: getChartData(meetings, 'business_line'),
      type: 'bar',
    },
    {
      title: 'Distribución etapa de negocio',
      dataset: getChartData(meetings, 'business_stage'),
      type: 'bar',
    },
    {
      title: 'Distribución número de consultas',
      dataset: getChartData(meetings, 'daily_consultations'),
      type: 'bar',
    },
    {
      title: 'Distribución de cómo llegó a Vambe',
      dataset: getChartData(meetings, 'how_came_to_vambe'),
      type: 'bar',
    },
  ];

  return <ChartGroup charts={charts} title="Distribución de clasificaciones" />;
}
