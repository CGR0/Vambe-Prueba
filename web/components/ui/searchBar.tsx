import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { Filters } from '@/utils/types';

interface SearchBarProps {
  filters: Filters;
  setFilters: (filters: Filters) => void;
}

export default function SearchBar({ filters, setFilters }: SearchBarProps) {
  const [search, setSearch] = useState('');

  useEffect(() => {
    setFilters({ ...filters, search: search });
  }, [search]);

  return (
    <TextField
      fullWidth
      placeholder="Buscar por fecha de la reunión, datos del cliente o vendedor"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        },
      }}
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: '9999px',
        },
      }}
    />
  );
}
