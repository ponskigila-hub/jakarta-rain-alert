import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { jakartaDistricts } from '@/data/mockData';
import { RiskBadge } from './RiskBadge';
import { Droplets, Waves, AlertTriangle } from 'lucide-react';

export const DistrictStats = () => {
  const sortedDistricts = [...jakartaDistricts].sort((a, b) => b.rainfall - a.rainfall);

  return (
    <Card>
      <CardHeader>
        <CardTitle>District Status</CardTitle>
        <CardDescription>Current rainfall and risk levels by district</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {sortedDistricts.map((district) => (
          <div
            key={district.id}
            className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/5 transition-colors"
          >
            <div className="flex items-center gap-3">
              {district.isFloodProne ? (
                <AlertTriangle className="w-5 h-5 text-risk-high" />
              ) : (
                <Droplets className="w-5 h-5 text-primary" />
              )}
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-sm">{district.name}</h4>
                  {district.isFloodProne && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-risk-high/10 text-risk-high font-medium">
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
        ))}
      </CardContent>
    </Card>
  );
};
