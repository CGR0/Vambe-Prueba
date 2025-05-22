import { ScatterChart } from '@mui/x-charts';
import LinkPoints from './linkPoints';

export default function CustomScatter({ props }: { props: any }) {
  return (
    <ScatterChart {...props} yAxis={[{ scaleType: 'linear', min: 0, max: 1 }]}>
      {props.series.map((serie: any) => (
        <LinkPoints key={serie.id} seriesId={serie.id} />
      ))}
    </ScatterChart>
  );
}
