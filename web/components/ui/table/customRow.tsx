import { TableRow, TableCell } from '@mui/material';

interface CustomRowProps {
  data: any[];
}

export default function CustomRow({ data }: CustomRowProps) {
  return (
    <TableRow>
      {data.map((item, index) => (
        <TableCell key={`${index}-${item}`}>{item}</TableCell>
      ))}
    </TableRow>
  );
}
