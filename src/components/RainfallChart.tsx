import { TrendChart } from '@/components/TrendChart';
import { rainfallHistory } from '@/data/mockData';

export const RainfallChart = () => {
  const last7Days = rainfallHistory.slice(-7);
  
  return (
    <TrendChart
      data={last7Days}
      title="7-Day Rainfall Trend"
      description="Average daily rainfall in mm across Jakarta"
      dataKey="rainfall"
      yAxisLabel="Rainfall (mm)"
      tooltipLabel="mm"
      chartColor="hsl(var(--chart-1))"
      referenceLines={[
        { value: 50, color: 'hsl(var(--risk-high))', label: 'High Risk' },
        { value: 20, color: 'hsl(var(--risk-medium))', label: 'Medium Risk' }
      ]}
    />
  );
};
