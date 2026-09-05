import { Card, CardContent } from '@/components/ui/card';
import { jakartaDistricts, rainfallHistory } from '@/data/mockData';
import { AlertTriangle, Droplets, MapPin, Waves } from 'lucide-react';

export const StatsOverview = () => {
  const highRiskCount = jakartaDistricts.filter((d) => d.riskLevel === 'high').length;
  const floodProneCount = jakartaDistricts.filter((d) => d.isFloodProne).length;
  const avgWaterLevel = Math.round(
    jakartaDistricts.reduce((acc, curr) => acc + curr.waterLevel, 0) / jakartaDistricts.length
  );
  const todayRainfall = rainfallHistory[rainfallHistory.length - 1].rainfall;
  const yesterdayRainfall = rainfallHistory[rainfallHistory.length - 2].rainfall;
  const rainfallDelta = todayRainfall - yesterdayRainfall;

  const stats = [
    {
      label: 'High Risk Areas',
      value: highRiskCount,
      total: jakartaDistricts.length,
      icon: AlertTriangle,
      tone: 'high' as const,
      subtitle: highRiskCount > 0 ? 'Needs attention' : 'All clear',
    },
    {
      label: 'Flood-Prone Areas',
      value: floodProneCount,
      total: jakartaDistricts.length,
      icon: MapPin,
      tone: 'medium' as const,
      subtitle: 'Historically at risk',
    },
    {
      label: 'Avg Water Level',
      value: `${avgWaterLevel}cm`,
      icon: Waves,
      tone: 'primary' as const,
      subtitle: 'Across all districts',
    },
    {
      label: "Today's Rainfall",
      value: `${todayRainfall}mm`,
      icon: Droplets,
      tone: 'accent' as const,
      subtitle:
        rainfallDelta === 0
          ? 'Same as yesterday'
          : `${rainfallDelta > 0 ? '+' : ''}${rainfallDelta}mm vs. yesterday`,
    },
  ];

  const toneStyles: Record<string, string> = {
    high: 'bg-risk-high/10 text-risk-high',
    medium: 'bg-risk-medium/10 text-risk-medium',
    primary: 'bg-primary/10 text-primary',
    accent: 'bg-accent/10 text-accent',
  };

  return (
    <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className="transition-all hover:shadow-md hover:-translate-y-0.5 duration-200"
        >
          <CardContent className="p-4 sm:p-5">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-medium text-muted-foreground leading-snug">
                  {stat.label}
                </p>
                <h3 className="text-xl sm:text-3xl font-bold mt-1 sm:mt-1.5 tracking-tight">
                  {stat.value}
                  {stat.total && (
                    <span className="text-sm sm:text-lg text-muted-foreground font-medium">
                      /{stat.total}
                    </span>
                  )}
                </h3>
                {stat.subtitle && (
                  <p className="text-[11px] sm:text-xs text-muted-foreground mt-1 truncate">
                    {stat.subtitle}
                  </p>
                )}
              </div>
              <div
                className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center shrink-0 ${toneStyles[stat.tone]}`}
              >
                <stat.icon className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
