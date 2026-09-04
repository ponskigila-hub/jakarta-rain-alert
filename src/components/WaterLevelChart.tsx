import { TrendChart } from '@/components/TrendChart';
import { waterLevelHistory } from '@/data/mockData';

export const WaterLevelChart = () => {
  const last7Days = waterLevelHistory.slice(-7);
  
  return (
    <TrendChart
      data={last7Days}
      title="7-Day Water Level Trend"
      description="Average water level in cm across Jakarta"
      dataKey="waterLevel"
      yAxisLabel="Water Level (cm)"
      tooltipLabel="cm"
      chartColor="hsl(var(--chart-2))"
      referenceLines={[
        { value: 60, color: 'hsl(var(--risk-medium))', label: 'Alert Level' },
        { value: 80, color: 'hsl(var(--risk-high))', label: 'Danger Level' }
      ]}
    />
  );
};
