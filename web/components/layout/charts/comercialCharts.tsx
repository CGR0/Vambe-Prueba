'use client';

import React from 'react';
import { ChartProps, Meeting } from '@/utils/types';
import { accumulateData, getChartData } from '@/utils/functions';
import ChartGroup from './chartGroup';

export default function ComercialCharts({ meetings }: { meetings: Meeting[] }) {
  const charts: ChartProps[] = [
    {
      title: 'Ventas cerradas por vendedor',
      dataset: getChartData(meetings, 'seller'),
      type: 'bar',
    },
    {
      title: 'Ventas por etapa de negocio',
      dataset: getChartData(meetings, 'business_stage'),
      type: 'bar',
    },
    {
      title: 'Ventas por línea de negocio',
      dataset: getChartData(meetings, 'business_line'),
      type: 'bar',
    },
    {
      title: 'Ventas a través del tiempo',
      dataset: accumulateData(getChartData(meetings, 'date')),
      type: 'line',
    },
  ];

  return <ChartGroup charts={charts} title="Rendimiento comercial" />;
}
