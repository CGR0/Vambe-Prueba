'use client';

import React, { useContext } from 'react';
import { DataContext } from '../../hooks/dataContext';
import { Filters } from '../../utils/types';
import { filterMeetings, getOptions } from '../../utils/functions';
import MultipleDropDown from '../ui/multipleDropDown';
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

  const handleFilter = async (filter: string, selectedValues: string[]) => {
    const newFilters = { ...filters, [filter]: selectedValues };
    setFilteredData({
      meetings: filterMeetings(originalData.meetings, newFilters),
    });
    setFilters(newFilters);
  };

  return (
    <div className="flex justify-center items-center -ml-5">
      <MultipleDropDown
        options={[
          { title: 'Ventas cerradas', value: 'true' },
          { title: 'Ventas fallidas', value: 'false' },
        ]}
        onSelect={(selectedValues) => handleFilter('sales', selectedValues)}
        selectedValues={filters.sales}
        title="Ventas"
      />
      <MultipleDropDown
        options={getOptions(originalData.meetings, 'client')}
        onSelect={(selectedValues) =>
          handleFilter('clientsIds', selectedValues)
        }
        selectedValues={filters.clientsIds}
        title="Clientes"
      />
      <MultipleDropDown
        options={getOptions(originalData.meetings, 'seller')}
        onSelect={(selectedValues) =>
          handleFilter('sellersIds', selectedValues)
        }
        selectedValues={filters.sellersIds}
        title="Vendedores"
      />
      <MultipleDropDown
        options={Object.values(BusinessLine).map((businessLine) => ({
          title: businessLine,
          value: businessLine,
        }))}
        onSelect={(selectedValues) =>
          handleFilter('businessLines', selectedValues)
        }
        selectedValues={filters.businessLines}
        title="Lineas de negocio"
      />
      <MultipleDropDown
        options={Object.values(BusinessStage).map((businessStage) => ({
          title: businessStage,
          value: businessStage,
        }))}
        onSelect={(selectedValues) =>
          handleFilter('businessStages', selectedValues)
        }
        selectedValues={filters.businessStages}
        title="Etapas de negocio"
      />
      <MultipleDropDown
        options={Object.values(DailyConsultations).map((dailyConsultation) => ({
          title: dailyConsultation,
          value: dailyConsultation,
        }))}
        onSelect={(selectedValues) =>
          handleFilter('dailyConsultations', selectedValues)
        }
        selectedValues={filters.dailyConsultations}
        title="Consultas diarias"
      />
      <MultipleDropDown
        options={Object.values(HowCameToVambe).map((howCameToVambe) => ({
          title: howCameToVambe,
          value: howCameToVambe,
        }))}
        onSelect={(selectedValues) =>
          handleFilter('howCameToVambe', selectedValues)
        }
        selectedValues={filters.howCameToVambe}
        title="Como llegó a Vambe"
      />
    </div>
  );
}
