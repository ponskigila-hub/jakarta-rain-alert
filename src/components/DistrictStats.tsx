import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { jakartaDistricts } from '@/data/mockData';
import { RiskBadge } from './RiskBadge';
import { Droplets, Waves, AlertTriangle } from 'lucide-react';

const riskBarColor: Record<string, string> = {
  safe: 'bg-risk-safe',
  medium: 'bg-risk-medium',
  high: 'bg-risk-high',
};

export const DistrictStats = () => {
  const sortedDistricts = [...jakartaDistricts].sort((a, b) => b.rainfall - a.rainfall);
  const maxRainfall = Math.max(...jakartaDistricts.map((d) => d.rainfall));

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>District Status</CardTitle>
        <CardDescription>Current rainfall and risk levels by district</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2.5">
        {sortedDistricts.map((district) => (
          <div
            key={district.id}
            className="p-3 rounded-lg border bg-card hover:bg-accent/5 hover:shadow-sm transition-all"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                {district.isFloodProne ? (
                  <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-risk-high shrink-0" />
                ) : (
                  <Droplets className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0" />
                )}
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-medium text-sm truncate">{district.name}</h4>
                    {district.isFloodProne && (
                      <span className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full bg-risk-high/10 text-risk-high font-medium whitespace-nowrap">
                        Flood-Prone
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                    <span className="flex items-center gap-1">
                      <Droplets className="w-3 h-3" />
                      {district.rainfall}mm
                    </span>
                    <span className="flex items-center gap-1">
                      <Waves className="w-3 h-3" />
                      {district.waterLevel}cm
                    </span>
                  </div>
                </div>
              </div>
              <RiskBadge level={district.riskLevel} showIcon={false} />
            </div>
            <div className="mt-2.5 h-1.5 rounded-full bg-muted overflow-hidden">
              <div
                className={`h-full rounded-full ${riskBarColor[district.riskLevel]} transition-all`}
                style={{ width: `${Math.min(100, (district.rainfall / maxRainfall) * 100)}%` }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
