'use client';

import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { Meeting } from '@/utils/types';
import { getMeetings } from '@/services/meetings';

interface DataTypes {
  meetings: Meeting[];
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
    meetings: [],
  });
  const [filteredData, setFilteredData] = useState<DataTypes>({
    meetings: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMeetings('transcription,client,seller');
      setOriginalData({ meetings: data });
      setFilteredData({ meetings: data });
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
