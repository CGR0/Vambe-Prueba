import { useScatterSeries, useXScale, useYScale } from '@mui/x-charts/hooks';

export default function LinkPoints({ seriesId }: { seriesId: string }) {
  const scatter = useScatterSeries(seriesId);
  const xScale = useXScale();
  const yScale = useYScale();

  if (!scatter) {
    return null;
  }
  const { color, data } = scatter;

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <path
      fill="none"
      stroke={color}
      strokeWidth={2}
      d={`M ${data.map(({ x, y }) => `${xScale(x)} ${yScale(y)}`).join(' L ')}`}
    />
  );
}
