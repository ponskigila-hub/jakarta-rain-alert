import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  jakartaDistricts,
  getDistrictRainfallHistory,
  getDistrictWaterLevelHistory,
  getSafetyTips,
} from '@/data/mockData';
import { RiskBadge } from '@/components/RiskBadge';
import { TrendChart } from '@/components/TrendChart';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  ArrowLeft,
  Droplets,
  Waves,
  Users,
  MapPin,
  AlertTriangle,
  ShieldCheck,
  Compass,
} from 'lucide-react';

const riskHero: Record<string, string> = {
  high: 'from-risk-high/15 via-risk-high/5 to-transparent',
  medium: 'from-risk-medium/15 via-risk-medium/5 to-transparent',
  safe: 'from-risk-safe/15 via-risk-safe/5 to-transparent',
};

const DistrictDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const district = jakartaDistricts.find((d) => d.id === id);

  if (!district) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4 text-center">
        <MapPin className="w-10 h-10 text-muted-foreground" />
        <h1 className="text-xl font-semibold">District not found</h1>
        <p className="text-muted-foreground text-sm max-w-sm">
          We couldn't find data for that location. It may have been removed or the link is incorrect.
        </p>
        <Button onClick={() => navigate('/')}>Back to overview</Button>
      </div>
    );
  }

  const rainfallTrend = getDistrictRainfallHistory(district).slice(-7);
  const waterLevelTrend = getDistrictWaterLevelHistory(district).slice(-7);
  const safetyTips = getSafetyTips(district);
  const otherDistricts = jakartaDistricts.filter((d) => d.id !== district.id);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/70 backdrop-blur-md sticky top-0 z-20">
        <div className="container mx-auto px-4 py-3 sm:py-4 flex items-center justify-between gap-3">
          <Button
            variant="ghost"
            size="sm"
            className="gap-1.5 -ml-2"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to overview</span>
            <span className="sm:hidden">Back</span>
          </Button>
          <ThemeToggle />
        </div>
      </header>

      {/* Hero */}
      <div className={`bg-gradient-to-b ${riskHero[district.riskLevel]}`}>
        <div className="container mx-auto px-4 pt-8 pb-6 sm:pt-12 sm:pb-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground mb-2">
                <MapPin className="w-3.5 h-3.5" />
                Jakarta, Indonesia
              </div>
              <h1 className="text-2xl sm:text-4xl font-bold tracking-tight">{district.name}</h1>
              <p className="text-sm sm:text-base text-muted-foreground mt-2 max-w-2xl leading-relaxed">
                {district.description}
              </p>
            </div>
            <RiskBadge level={district.riskLevel} />
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="container mx-auto px-4 py-6 sm:py-8 space-y-6 sm:space-y-8">
        {/* Key metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <Card>
            <CardContent className="p-4 sm:p-5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Droplets className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Rainfall</p>
                <p className="text-lg sm:text-xl font-bold">{district.rainfall}mm</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 sm:p-5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center shrink-0">
                <Waves className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Water Level</p>
                <p className="text-lg sm:text-xl font-bold">{district.waterLevel}cm</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 sm:p-5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-secondary text-secondary-foreground flex items-center justify-center shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Population</p>
                <p className="text-lg sm:text-xl font-bold truncate">{district.population}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 sm:p-5 flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  district.isFloodProne ? 'bg-risk-high/10 text-risk-high' : 'bg-risk-safe/10 text-risk-safe'
                }`}
              >
                {district.isFloodProne ? <AlertTriangle className="w-5 h-5" /> : <ShieldCheck className="w-5 h-5" />}
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Area Type</p>
                <p className="text-sm sm:text-base font-bold leading-tight">
                  {district.isFloodProne ? 'Flood-Prone' : 'Normal Area'}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Trend charts */}
        <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
          <TrendChart
            data={rainfallTrend}
            title="7-Day Rainfall Trend"
            description={`Daily rainfall in ${district.name}`}
            dataKey="rainfall"
            yAxisLabel="Rainfall (mm)"
            tooltipLabel="mm"
            chartColor="hsl(var(--chart-1))"
            referenceLines={[
              { value: 50, color: 'hsl(var(--risk-high))', label: 'High Risk' },
              { value: 20, color: 'hsl(var(--risk-medium))', label: 'Medium Risk' },
            ]}
          />
          <TrendChart
            data={waterLevelTrend}
            title="7-Day Water Level Trend"
            description={`Water level in ${district.name}`}
            dataKey="waterLevel"
            yAxisLabel="Water Level (cm)"
            tooltipLabel="cm"
            chartColor="hsl(var(--chart-2))"
            referenceLines={[{ value: 80, color: 'hsl(var(--risk-high))', label: 'Danger Level' }]}
          />
        </div>

        {/* Safety guidance */}
        <Card>
          <CardContent className="p-5 sm:p-6">
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="w-5 h-5 text-primary" />
              <h2 className="font-semibold text-base sm:text-lg">Safety Recommendations</h2>
            </div>
            <ul className="space-y-2">
              {safetyTips.map((tip, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  <span className="leading-relaxed">{tip}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Other districts */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Compass className="w-4 h-4 text-muted-foreground" />
            <h2 className="font-semibold text-base sm:text-lg">Other Districts</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {otherDistricts.map((d) => (
              <Link key={d.id} to={`/district/${d.id}`}>
                <Card className="hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer h-full">
                  <CardContent className="p-3.5 sm:p-4">
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <h3 className="font-medium text-sm truncate">{d.name}</h3>
                    </div>
                    <RiskBadge level={d.riskLevel} showIcon={false} />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DistrictDetail;
