import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

interface ReferenceLineConfig {
  value: number;
  color: string;
  label: string;
}

interface TrendChartProps {
  data: any[];
  title: string;
  description: string;
  dataKey: string;
  yAxisLabel: string;
  tooltipLabel: string;
  chartColor: string;
  referenceLines?: ReferenceLineConfig[];
}

export const TrendChart = ({
  data,
  title,
  description,
  dataKey,
  yAxisLabel,
  tooltipLabel,
  chartColor,
  referenceLines = []
}: TrendChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis 
              dataKey="date" 
              tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              className="text-muted-foreground"
            />
            <YAxis 
              label={{ value: yAxisLabel, angle: -90, position: 'insideLeft' }}
              className="text-muted-foreground"
            />
            <Tooltip 
              labelFormatter={(value) => new Date(value).toLocaleDateString()}
              formatter={(value: number) => [`${value}${tooltipLabel}`, dataKey.charAt(0).toUpperCase() + dataKey.slice(1)]}
            />
            {referenceLines.map((line, index) => (
              <ReferenceLine 
                key={index}
                y={line.value} 
                stroke={line.color} 
                strokeDasharray="3 3" 
                label={line.label} 
              />
            ))}
            <Line 
              type="monotone" 
              dataKey={dataKey} 
              stroke={chartColor} 
              strokeWidth={3}
              dot={{ fill: chartColor, r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
