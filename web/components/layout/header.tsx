'use client';

import { DataContext } from '@/hooks/dataContext';
import { useState, useEffect, useContext } from 'react';
import CustomIconButton from '../ui/customIconButton';
import SearchBar from '../ui/searchBar';
import FilterSection from './filterSection';
import TuneIcon from '@mui/icons-material/Tune';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import { Filters } from '@/utils/types';
import { filterMeetings } from '@/utils/functions';
import Image from 'next/image';

export default function Header() {
  const context = useContext(DataContext);
  if (!context) return null;
  const { originalData, setFilteredData } = context;

  const [showFilters, setShowFilters] = useState(false);
  const [filtersCount, setFiltersCount] = useState(0);
  const [filters, setFilters] = useState<Filters>({
    sales: [],
    clientsIds: [],
    sellersIds: [],
    businessLines: [],
    businessStages: [],
    dailyConsultations: [],
    howCameToVambe: [],
    search: '',
  });

  useEffect(() => {
    setFiltersCount(
      Object.values(filters).reduce((acc, curr) => {
        if (curr === filters.search) {
          return acc + (curr.length > 0 ? 1 : 0);
        }
        return acc + curr.length;
      }, 0),
    );
    if (
      filters.sales.length === 0 ||
      filters.clientsIds.length === 0 ||
      filters.sellersIds.length === 0 ||
      filters.businessLines.length === 0 ||
      filters.businessStages.length === 0 ||
      filters.dailyConsultations.length === 0 ||
      filters.howCameToVambe.length === 0 ||
      filters.search.length > 0
    ) {
      setFilteredData(originalData);
      setFilteredData({
        meetings: filterMeetings(originalData.meetings, filters),
      });
    }
  }, [filters]);

  const removeFilters = () => {
    setFilteredData(originalData);
    setFilters({
      sales: [],
      clientsIds: [],
      sellersIds: [],
      businessLines: [],
      businessStages: [],
      dailyConsultations: [],
      howCameToVambe: [],
      search: '',
    });
  };

  return (
    <header
      className={`flex flex-col fixed w-screen shadow-md z-50 bg-white transition-[height] duration-300 ease-in-out ${
        showFilters ? 'h-[200px]' : 'h-[120px]'
      }`}
    >
      <div className="flex justify-between items-center w-full">
        <Image
          src="/vambeLogo.png"
          alt="Vambe Logo"
          width={270}
          height={270}
          className="ml-8"
        />
        <div className="w-250 mr-8">
          <div className="flex justify-center items-center gap-4 p-8">
            <SearchBar filters={filters} setFilters={setFilters} />
            <CustomIconButton
              onClick={() => setShowFilters(!showFilters)}
              icon={<TuneIcon />}
              tooltip={showFilters ? 'Ocultar filtros' : 'Mostrar filtros'}
              badgeCount={filtersCount}
            />
            <CustomIconButton
              onClick={removeFilters}
              icon={<FilterAltOffIcon />}
              tooltip="Limpiar filtros"
            />
          </div>
        </div>
      </div>

      {showFilters && (
        <div
          className={`transition-opacity duration-300 ${
            showFilters ? 'opacity-100' : 'opacity-0 h-0'
          }`}
        >
          <FilterSection filters={filters} setFilters={setFilters} />
        </div>
      )}
    </header>
  );
}
