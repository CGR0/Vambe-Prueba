'use client';

import {
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Checkbox,
  ListItemText,
  OutlinedInput,
  Badge,
} from '@mui/material';

export interface MultipleDropDownProps {
  options: { title: string; value: any }[];
  onSelect: (options: string[]) => void;
  selectedValues: string[];
  title: string;
}

export default function MultipleDropDown({
  options,
  onSelect,
  selectedValues,
  title,
}: MultipleDropDownProps) {
  return (
    <div className="flex justify-center items-center m-1.5">
      <FormControl sx={{ width: 190 }}>
        <Badge
          badgeContent={selectedValues.length}
          color="primary"
          overlap="circular"
          sx={{
            position: 'absolute',
            right: 0,
            top: 0,
          }}
        />
        <InputLabel id="demo-multiple-checkbox-label">{title}</InputLabel>
        <Select
          multiple
          value={selectedValues}
          onChange={(e) => onSelect(e.target.value as string[])}
          input={<OutlinedInput label={title} />}
          renderValue={(selected) => {
            return options
              .filter((option) => selected.includes(option.value))
              .map((option) => option.title)
              .join(', ');
          }}
        >
          {options.map((option) => (
            <MenuItem key={option.title} value={option.value}>
              <Checkbox checked={selectedValues.includes(option.value)} />
              <ListItemText primary={option.title} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
