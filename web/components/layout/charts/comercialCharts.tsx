'use client';

import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../../hooks/dataContext';
import Chart from '@/components/ui/chart';
import { ChartProps } from '@/utils/types';
import { accumulateData, getChartData } from '@/utils/functions';
import { CustomDropDownMenu } from '@/components/ui/dropDownMenu';

export default function ComercialCharts() {
  const dataContext = useContext(DataContext);
  if (!dataContext) return null;

  const { filteredData } = dataContext;

  const closedMeetings = filteredData.meetings.filter(
    (meeting) => meeting.closed,
  );

  const charts: ChartProps[] = [
    {
      title: 'Ventas cerradas por vendedor',
      dataset: getChartData(closedMeetings, 'seller'),
      type: 'bar',
    },
    {
      title: 'Ventas por etapa de negocio',
      dataset: getChartData(closedMeetings, 'business_stage'),
      type: 'bar',
      horizontal: true,
    },
    {
      title: 'Ventas por línea de negocio',
      dataset: getChartData(closedMeetings, 'business_line'),
      type: 'bar',
      horizontal: true,
    },
    {
      title: 'Ventas a través del tiempo',
      dataset: accumulateData(getChartData(closedMeetings, 'date')),
      type: 'line',
    },
  ];

  const [currentChart, setCurrentChart] = useState<ChartProps>();

  useEffect(() => {
    setCurrentChart(charts[0]);
  }, [filteredData]);

  return (
    <div className="flex flex-col gap-5">
      <CustomDropDownMenu
        options={charts.map((chart) => ({
          title: chart.title,
          value: chart,
        }))}
        onSelect={(option) => setCurrentChart(option)}
        selectedValue={currentChart?.title || ''}
      />
      {currentChart && (
        <div key={currentChart.title}>
          <Chart
            title={currentChart.title}
            dataset={currentChart.dataset}
            type={currentChart.type}
            horizontal={currentChart.horizontal}
          />
        </div>
      )}
    </div>
  );
}
