import { JakartaMap } from '@/components/JakartaMap';
import { RainfallChart } from '@/components/RainfallChart';
import { WaterLevelChart } from '@/components/WaterLevelChart';
import { AlertList } from '@/components/AlertList';
import { DistrictStats } from '@/components/DistrictStats';
import { StatsOverview } from '@/components/StatsOverview';
import { recentAlerts } from '@/data/mockData';
import { Cloud, Waves } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-primary flex items-center justify-center">
                <Waves className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg sm:text-2xl font-bold">Jakarta Flood Alert</h1>
                <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">
                  Real-time flood risk monitoring
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
              <Cloud className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Last updated: Just now</span>
              <span className="sm:hidden">Just now</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-4 sm:py-6 lg:py-8 space-y-4 sm:space-y-6 lg:space-y-8">
        {/* Stats Overview */}
        <StatsOverview />

        {/* Map Section */}
        <section>
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Interactive Risk Map</h2>
          <JakartaMap />
        </section>

        {/* Charts Grid */}
        <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
          <RainfallChart />
          <WaterLevelChart />
        </div>

        {/* Alerts and District Stats */}
        <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
          <AlertList alerts={recentAlerts} />
          <DistrictStats />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-8 sm:mt-12 py-4 sm:py-6 bg-muted/30">
        <div className="container mx-auto px-4 text-center text-xs sm:text-sm text-muted-foreground">
          <p>
            Jakarta Flood Alert System • Climate Action Initiative
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
