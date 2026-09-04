import { Card, CardContent } from '@/components/ui/card';
import { jakartaDistricts, rainfallHistory } from '@/data/mockData';
import { AlertTriangle, Droplets, MapPin, Waves } from 'lucide-react';

export const StatsOverview = () => {
  const highRiskCount = jakartaDistricts.filter((d) => d.riskLevel === 'high').length;
  const floodProneCount = jakartaDistricts.filter((d) => d.isFloodProne).length;
  const avgRainfall = Math.round(
    rainfallHistory.reduce((acc, curr) => acc + curr.rainfall, 0) / rainfallHistory.length
  );
  const avgWaterLevel = Math.round(
    jakartaDistricts.reduce((acc, curr) => acc + curr.waterLevel, 0) / jakartaDistricts.length
  );
  const todayRainfall = rainfallHistory[rainfallHistory.length - 1].rainfall;

  const stats = [
    {
      label: 'High Risk Areas',
      value: highRiskCount,
      total: jakartaDistricts.length,
      icon: AlertTriangle,
      color: 'text-risk-high',
    },
    {
      label: 'Flood-Prone Areas',
      value: floodProneCount,
      total: jakartaDistricts.length,
      icon: MapPin,
      color: 'text-risk-medium',
    },
    {
      label: 'Avg Water Level',
      value: `${avgWaterLevel}cm`,
      subtitle: 'All districts',
      icon: Waves,
      color: 'text-primary',
    },
    {
      label: 'Today\'s Rainfall',
      value: `${todayRainfall}mm`,
      subtitle: 'Current average',
      icon: Droplets,
      color: 'text-accent',
    },
  ];

  return (
    <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-muted-foreground">{stat.label}</p>
                <h3 className="text-xl sm:text-3xl font-bold mt-1 sm:mt-2">
                  {stat.value}
                  {stat.total && (
                    <span className="text-sm sm:text-lg text-muted-foreground">/{stat.total}</span>
                  )}
                </h3>
                {stat.subtitle && (
                  <p className="text-xs text-muted-foreground mt-1 hidden sm:block">{stat.subtitle}</p>
                )}
              </div>
              <stat.icon className={`w-6 h-6 sm:w-8 sm:h-8 ${stat.color}`} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
