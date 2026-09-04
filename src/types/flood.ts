export type RiskLevel = 'safe' | 'medium' | 'high';

export interface DistrictData {
  id: string;
  name: string;
  rainfall: number;
  riskLevel: RiskLevel;
  coordinates: [number, number];
  isFloodProne: boolean;
  waterLevel: number; // in cm
}

export interface RainfallHistory {
  date: string;
  rainfall: number;
}

export interface WaterLevelHistory {
  date: string;
  waterLevel: number;
}

export interface Alert {
  id: string;
  district: string;
  level: RiskLevel;
  message: string;
  timestamp: string;
}
