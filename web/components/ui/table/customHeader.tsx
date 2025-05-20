import { TableCell, TableRow, TableHead } from '@mui/material';

interface CustomHeaderProps {
  titles: string[];
}

export default function CustomHeader({ titles }: CustomHeaderProps) {
  return (
    <TableHead>
      <TableRow>
        {titles.map((title) => (
          <TableCell key={title}>{title}</TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
