import { JakartaMap } from '@/components/JakartaMap';
import { RainfallChart } from '@/components/RainfallChart';
import { WaterLevelChart } from '@/components/WaterLevelChart';
import { AlertList } from '@/components/AlertList';
import { DistrictStats } from '@/components/DistrictStats';
import { StatsOverview } from '@/components/StatsOverview';
import { ThemeToggle } from '@/components/ThemeToggle';
import { recentAlerts } from '@/data/mockData';
import { Waves } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/70 backdrop-blur-md sticky top-0 z-20 supports-[backdrop-filter]:bg-card/60">
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0 shadow-sm">
                <Waves className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" />
              </div>
              <div className="min-w-0">
                <h1 className="text-base sm:text-2xl font-bold leading-tight truncate">Jakarta Flood Alert</h1>
                <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">
                  Real-time flood risk monitoring
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-4 shrink-0">
              <div className="hidden sm:flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground border rounded-full px-3 py-1.5 bg-background/50">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-risk-safe opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-risk-safe" />
                </span>
                <span>Live · Updated just now</span>
              </div>
              <div className="sm:hidden flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-risk-safe opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-risk-safe" />
                </span>
                Live
              </div>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-5 sm:py-6 lg:py-8 space-y-6 sm:space-y-8 lg:space-y-10">
        {/* Stats Overview */}
        <StatsOverview />

        {/* Map Section */}
        <section>
          <div className="mb-3 sm:mb-4">
            <h2 className="text-lg sm:text-xl font-semibold">Interactive Risk Map</h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              Tap a district marker to see detailed rainfall and water level data
            </p>
          </div>
          <JakartaMap />
        </section>

        {/* Charts Grid */}
        <section>
          <div className="mb-3 sm:mb-4">
            <h2 className="text-lg sm:text-xl font-semibold">Trends</h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              Rainfall and water level over the past week
            </p>
          </div>
          <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
            <RainfallChart />
            <WaterLevelChart />
          </div>
        </section>

        {/* Alerts and District Stats */}
        <section>
          <div className="grid gap-4 sm:gap-6 lg:grid-cols-2 items-start">
            <AlertList alerts={recentAlerts} />
            <DistrictStats />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t mt-8 sm:mt-12 py-5 sm:py-6 bg-muted/30">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2 text-center text-xs sm:text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Waves className="w-3.5 h-3.5" />
            Jakarta Flood Alert System
          </span>
          <span className="hidden sm:inline">•</span>
          <span>Climate Action Initiative</span>
        </div>
      </footer>
    </div>
  );
};

export default Index;
