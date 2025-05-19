import KpiSection from './kpiSection';
import ChartSection from './chartSection';

export default function MainPage() {
  return (
    <div className="flex flex-col gap-5">
      <KpiSection />
      <ChartSection />
    </div>
  );
}
