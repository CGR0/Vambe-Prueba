'use client';

import { cn } from '@/lib/utils';
import { useState } from 'react';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <aside
      className={cn(
        'fixed lg:sticky h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300 top-0 left-0 z-40',
        isOpen ? 'w-60' : 'w-[52px]',
      )}
    >
      <div className="relative w-full *:w-full h-full flex flex-col items-start overflow-y-auto border-r">
        {/* <Menu /> */}
      </div>
    </aside>
  );
}
