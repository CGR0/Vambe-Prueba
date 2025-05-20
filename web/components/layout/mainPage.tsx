import KpiSection from './kpiSection';
import ChartSection from './chartSection';
import TableSection from './tableSection';

export default function MainPage() {
  return (
    <div className="flex flex-col gap-5">
      <KpiSection />
      <TableSection />
      <ChartSection />
    </div>
  );
}
