import { RiskLevel } from '@/types/flood';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, AlertCircle, CheckCircle } from 'lucide-react';

interface RiskBadgeProps {
  level: RiskLevel;
  showIcon?: boolean;
}

const riskConfig = {
  safe: {
    label: 'Low Risk',
    icon: CheckCircle,
    className: 'bg-risk-safe text-risk-safe-foreground hover:bg-risk-safe/90',
  },
  medium: {
    label: 'Medium Risk',
    icon: AlertCircle,
    className: 'bg-risk-medium text-risk-medium-foreground hover:bg-risk-medium/90',
  },
  high: {
    label: 'High Risk',
    icon: AlertTriangle,
    className: 'bg-risk-high text-risk-high-foreground hover:bg-risk-high/90',
  },
};

export const RiskBadge = ({ level, showIcon = true }: RiskBadgeProps) => {
  const config = riskConfig[level];
  const Icon = config.icon;

  return (
    <Badge className={`${config.className} whitespace-nowrap`}>
      {showIcon && <Icon className="w-3 h-3 mr-1" />}
      {config.label}
    </Badge>
  );
};
