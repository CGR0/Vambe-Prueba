'use client';

import React, { useState, useEffect, useContext } from 'react';
import MainPage from '@/components/layout/mainPage';
import { CircularProgress } from '@mui/material';
import { DataContext } from '@/hooks/dataContext';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const context = useContext(DataContext);
  if (!context) return null;

  const { originalData } = context;

  useEffect(() => {
    if (originalData.meetings.length > 0) {
      setIsLoading(false);
    }
  }, [originalData]);

  return (
    <div className="mt-[60px] w-full items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <CircularProgress />
        </div>
      ) : (
        <MainPage />
      )}
    </div>
  );
}
