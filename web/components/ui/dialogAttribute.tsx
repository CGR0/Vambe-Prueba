import { Typography } from '@mui/material';

export default function DialogAttribute({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div>
      <div className="flex justify-between items-center">
        <Typography variant="subtitle1">{title}:</Typography>
        <Typography variant="body1" className="text-right max-w-[70%]">
          {value}
        </Typography>
      </div>
      <div className="border-b border-gray-200 w-full mt-2"></div>
    </div>
  );
}
