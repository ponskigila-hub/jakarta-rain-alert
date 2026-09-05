import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, RiskLevel } from '@/types/flood';
import { RiskBadge } from './RiskBadge';
import { formatDistanceToNow } from 'date-fns';
import { AlertTriangle, AlertCircle, CheckCircle, BellOff } from 'lucide-react';

interface AlertListProps {
  alerts: Alert[];
}

const levelConfig: Record<RiskLevel, { icon: typeof AlertTriangle; border: string; iconColor: string }> = {
  high: { icon: AlertTriangle, border: 'border-l-risk-high', iconColor: 'text-risk-high' },
  medium: { icon: AlertCircle, border: 'border-l-risk-medium', iconColor: 'text-risk-medium' },
  safe: { icon: CheckCircle, border: 'border-l-risk-safe', iconColor: 'text-risk-safe' },
};

export const AlertList = ({ alerts }: AlertListProps) => {
  const highCount = alerts.filter((a) => a.level === 'high').length;

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-start justify-between gap-3 space-y-0">
        <div>
          <CardTitle>Recent Alerts</CardTitle>
          <CardDescription>Latest flood risk notifications</CardDescription>
        </div>
        {highCount > 0 && (
          <span className="shrink-0 text-xs font-semibold px-2 py-1 rounded-full bg-risk-high/10 text-risk-high whitespace-nowrap">
            {highCount} urgent
          </span>
        )}
      </CardHeader>
      <CardContent>
        {alerts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center text-muted-foreground">
            <BellOff className="w-8 h-8 mb-2 opacity-50" />
            <p className="text-sm">No active alerts right now</p>
          </div>
        ) : (
          <ScrollArea className="h-[340px] pr-3 -mr-3">
            <div className="space-y-3">
              {alerts.map((alert) => {
                const config = levelConfig[alert.level];
                const Icon = config.icon;
                return (
                  <div
                    key={alert.id}
                    className={`p-3.5 rounded-lg border border-l-4 ${config.border} bg-card hover:bg-accent/5 hover:shadow-sm transition-all`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-1.5">
                      <div className="flex items-center gap-2 min-w-0">
                        <Icon className={`w-4 h-4 shrink-0 ${config.iconColor}`} />
                        <h4 className="font-semibold text-sm truncate">{alert.district}</h4>
                      </div>
                      <RiskBadge level={alert.level} />
                    </div>
                    <p className="text-sm text-muted-foreground mb-1.5 leading-snug">{alert.message}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(alert.timestamp), { addSuffix: true })}
                    </p>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};
