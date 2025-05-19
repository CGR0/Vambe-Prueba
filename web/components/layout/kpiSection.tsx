'use client';

import React, { useContext } from 'react';
import { DataContext } from '../../hooks/dataContext';
import Kpi from '../ui/kpi';
import { Paper } from '@mui/material';
export default function KpiSection() {
  const context = useContext(DataContext);
  if (!context) return null;

  const { filteredData } = context;

  const closedMeetings = filteredData.meetings.filter(
    (meeting) => meeting.closed,
  );

  const kpis = [
    {
      label: 'Reuniones totales',
      value: filteredData.meetings.length,
    },
    {
      label: 'Tasa de cierre',
      value:
        ((closedMeetings.length / filteredData.meetings.length) * 100).toFixed(
          2,
        ) + '%',
    },
    {
      label: 'Total de clientes',
      value: filteredData.clients.length,
    },
    {
      label: 'Total de vendedores',
      value: filteredData.sellers.length,
    },
  ];

  return (
    <Paper className="flex justify-between p-10 gap-10 rounded-3xl shadow-md bg-white">
      {kpis.map((kpi) => (
        <Kpi key={kpi.label} label={kpi.label} value={kpi.value.toString()} />
      ))}
    </Paper>
  );
}
