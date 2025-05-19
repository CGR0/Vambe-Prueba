'use client';

import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { Client, Meeting, Seller } from '@/utils/types';
import { getOriginalData } from '@/utils/functions';

interface DataTypes {
  clients: Client[];
  meetings: Meeting[];
  sellers: Seller[];
}

interface DataContextType {
  originalData: DataTypes;
  filteredData: DataTypes;
  setFilteredData: (data: DataTypes) => void;
}

export const DataContext = createContext<DataContextType | undefined>(
  undefined,
);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [originalData, setOriginalData] = useState<DataTypes>({
    clients: [],
    meetings: [],
    sellers: [],
  });
  const [filteredData, setFilteredData] = useState<DataTypes>({
    clients: [],
    meetings: [],
    sellers: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getOriginalData();
      setOriginalData(data);
      setFilteredData(data);
    };
    fetchData();
  }, []);

  return (
    <DataContext.Provider
      value={{ filteredData, setFilteredData, originalData }}
    >
      {children}
    </DataContext.Provider>
  );
};
