'use client';

import React, { useContext } from 'react';
import { DataContext } from '../../hooks/dataContext';
import Kpi from '../ui/kpi';
import { Paper } from '@mui/material';
import { getLength } from '@/utils/functions';
export default function KpiSection() {
  const context = useContext(DataContext);
  if (!context) return null;

  const { filteredData, originalData } = context;

  const closedMeetingsLength = getLength(filteredData.meetings, 'closed');
  const clientsLength = getLength(filteredData.meetings, 'client');
  const originalClientsLength = getLength(originalData.meetings, 'client');
  const sellersLength = getLength(filteredData.meetings, 'seller');
  const originalSellersLength = getLength(originalData.meetings, 'seller');

  const kpis = [
    {
      label: 'Reuniones totales',
      value: filteredData.meetings.length,
      maxValue: originalData.meetings.length,
    },
    {
      label: 'Tasa de cierre',
      value: ((closedMeetingsLength / filteredData.meetings.length) *
        100) as number,
      maxValue: 100,
      percentage: true,
    },
    {
      label: 'Total de clientes',
      value: clientsLength,
      maxValue: originalClientsLength,
    },
    {
      label: 'Total de vendedores',
      value: sellersLength,
      maxValue: originalSellersLength,
    },
  ];

  return (
    <Paper className="flex justify-between p-10 gap-10 rounded-3xl shadow-md bg-white">
      {kpis.map((kpi) => (
        <Kpi
          key={kpi.label}
          label={kpi.label}
          value={kpi.value}
          maxValue={kpi.maxValue}
          percentage={kpi.percentage ?? false}
        />
      ))}
    </Paper>
  );
}
