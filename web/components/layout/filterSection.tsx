'use client';

import React, { useContext } from 'react';
import { DataContext } from '../../hooks/dataContext';
import { Filters } from '../../utils/types';
import { filterMeetings, getOptions } from '../../utils/functions';
import MultipleDropDown, {
  MultipleDropDownProps,
} from '../ui/multipleDropDown';
import {
  BusinessLine,
  BusinessStage,
  DailyConsultations,
  HowCameToVambe,
} from '@/utils/enums';

interface FilterSectionProps {
  filters: Filters;
  setFilters: (filters: Filters) => void;
}

export default function FilterSection({
  filters,
  setFilters,
}: FilterSectionProps) {
  const context = useContext(DataContext);
  if (!context) return null;
  const { originalData, setFilteredData } = context;

  const dropDownMenus: MultipleDropDownProps[] = [
    {
      title: 'Ventas',
      options: [
        { title: 'Ventas cerradas', value: 'true' },
        { title: 'Ventas fallidas', value: 'false' },
      ],
      onSelect: (selectedValues: string[]) =>
        handleFilter('sales', selectedValues),
      selectedValues: filters.sales,
    },
    {
      title: 'Clientes',
      options: getOptions(originalData.meetings, 'client'),
      onSelect: (selectedValues: string[]) =>
        handleFilter('clientsIds', selectedValues),
      selectedValues: filters.clientsIds,
    },
    {
      title: 'Vendedores',
      options: getOptions(originalData.meetings, 'seller'),
      onSelect: (selectedValues: string[]) =>
        handleFilter('sellersIds', selectedValues),
      selectedValues: filters.sellersIds,
    },
    {
      title: 'Lineas de negocio',
      options: Object.values(BusinessLine).map((businessLine) => ({
        title: businessLine,
        value: businessLine,
      })),
      onSelect: (selectedValues: string[]) =>
        handleFilter('businessLines', selectedValues),
      selectedValues: filters.businessLines,
    },
    {
      title: 'Etapas de negocio',
      options: Object.values(BusinessStage).map((businessStage) => ({
        title: businessStage,
        value: businessStage,
      })),
      onSelect: (selectedValues: string[]) =>
        handleFilter('businessStages', selectedValues),
      selectedValues: filters.businessStages,
    },
    {
      title: 'Consultas diarias',
      options: Object.values(DailyConsultations).map((dailyConsultation) => ({
        title: dailyConsultation,
        value: dailyConsultation,
      })),
      onSelect: (selectedValues: string[]) =>
        handleFilter('dailyConsultations', selectedValues),
      selectedValues: filters.dailyConsultations,
    },
    {
      title: 'Como llegó a Vambe',
      options: Object.values(HowCameToVambe).map((howCameToVambe) => ({
        title: howCameToVambe,
        value: howCameToVambe,
      })),
      onSelect: (selectedValues: string[]) =>
        handleFilter('howCameToVambe', selectedValues),
      selectedValues: filters.howCameToVambe,
    },
  ];

  const handleFilter = async (filter: string, selectedValues: string[]) => {
    const newFilters = { ...filters, [filter]: selectedValues };
    setFilteredData({
      meetings: filterMeetings(originalData.meetings, newFilters),
    });
    setFilters(newFilters);
  };

  return (
    <div className="flex justify-center items-center -ml-5">
      {dropDownMenus.map((menu) => (
        <MultipleDropDown key={menu.title} {...menu} />
      ))}
    </div>
  );
}
