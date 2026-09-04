import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert } from '@/types/flood';
import { RiskBadge } from './RiskBadge';
import { formatDistanceToNow } from 'date-fns';

interface AlertListProps {
  alerts: Alert[];
}

export const AlertList = ({ alerts }: AlertListProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Alerts</CardTitle>
        <CardDescription>Latest flood risk notifications</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors"
          >
            <div className="flex items-start justify-between gap-4 mb-2">
              <h4 className="font-semibold text-sm">{alert.district}</h4>
              <RiskBadge level={alert.level} />
            </div>
            <p className="text-sm text-muted-foreground mb-2">{alert.message}</p>
            <p className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(alert.timestamp), { addSuffix: true })}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
