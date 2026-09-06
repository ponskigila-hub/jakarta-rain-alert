import { Card, CardContent } from '@/components/ui/card';
import { jakartaDistricts, rainfallHistory } from '@/data/mockData';
import { Link } from 'react-router-dom';
import { AlertTriangle, TrendingUp, TrendingDown, ShieldCheck, ArrowRight } from 'lucide-react';

export const InsightsPanel = () => {
  const mostAtRisk = [...jakartaDistricts].sort((a, b) => b.rainfall - a.rainfall)[0];
  const safest = [...jakartaDistricts].sort((a, b) => a.rainfall - b.rainfall)[0];

  const last7 = rainfallHistory.slice(-7);
  const prev7 = rainfallHistory.slice(-14, -7);
  const last7Avg = last7.reduce((a, b) => a + b.rainfall, 0) / last7.length;
  const prev7Avg = prev7.reduce((a, b) => a + b.rainfall, 0) / prev7.length;
  const weeklyChange = Math.round(((last7Avg - prev7Avg) / prev7Avg) * 100);
  const isRising = weeklyChange > 0;

  return (
    <div className="grid gap-3 sm:gap-4 sm:grid-cols-3">
      <Card className="border-2 border-risk-high/20 bg-risk-high/[0.03]">
        <CardContent className="p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-risk-high/15 text-risk-high flex items-center justify-center shrink-0">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <p className="text-xs font-semibold text-foreground/70 uppercase tracking-wide">Needs Attention</p>
          </div>
          <p className="text-sm text-foreground/90 leading-relaxed">
            <span className="font-bold">{mostAtRisk.name}</span> has the highest rainfall right now at{' '}
            <span className="font-bold">{mostAtRisk.rainfall}mm</span>.
          </p>
          <Link
            to={`/district/${mostAtRisk.id}`}
            className="inline-flex items-center gap-1 text-xs font-medium text-risk-high hover:underline mt-2"
          >
            View district <ArrowRight className="w-3 h-3" />
          </Link>
        </CardContent>
      </Card>

      <Card className={`border-2 ${isRising ? 'border-risk-medium/20 bg-risk-medium/[0.03]' : 'border-risk-safe/20 bg-risk-safe/[0.03]'}`}>
        <CardContent className="p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-2">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${isRising ? 'bg-risk-medium/15 text-risk-medium' : 'bg-risk-safe/15 text-risk-safe'}`}>
              {isRising ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            </div>
            <p className="text-xs font-semibold text-foreground/70 uppercase tracking-wide">Weekly Trend</p>
          </div>
          <p className="text-sm text-foreground/90 leading-relaxed">
            Citywide rainfall is <span className="font-bold">{isRising ? 'up' : 'down'} {Math.abs(weeklyChange)}%</span>{' '}
            compared to the previous 7 days.
          </p>
          <p className="text-xs text-foreground/50 mt-2">Based on the last 14 days of readings</p>
        </CardContent>
      </Card>

      <Card className="border-2 border-risk-safe/20 bg-risk-safe/[0.03]">
        <CardContent className="p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-risk-safe/15 text-risk-safe flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <p className="text-xs font-semibold text-foreground/70 uppercase tracking-wide">Safest Right Now</p>
          </div>
          <p className="text-sm text-foreground/90 leading-relaxed">
            <span className="font-bold">{safest.name}</span> has the lowest rainfall at{' '}
            <span className="font-bold">{safest.rainfall}mm</span> — a good baseline for comparison.
          </p>
          <Link
            to={`/district/${safest.id}`}
            className="inline-flex items-center gap-1 text-xs font-medium text-risk-safe hover:underline mt-2"
          >
            View district <ArrowRight className="w-3 h-3" />
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};
