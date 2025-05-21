import { MenuItem, Select, FormControl } from '@mui/material';

export function CustomDropDownMenu({
  options,
  onSelect,
  selectedValue,
  className,
}: {
  options: { title: string; value: any }[];
  onSelect: (option: any) => void;
  selectedValue: any;
  className?: string;
}) {
  return (
    <div>
      <FormControl className={className}>
        <Select
          value={
            options.find((opt) => opt.title === selectedValue)?.value || ''
          }
          onChange={(e) => onSelect(e.target.value)}
        >
          {options.map((option) => (
            <MenuItem key={option.title} value={option.value}>
              {option.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
