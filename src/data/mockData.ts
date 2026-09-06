import { DistrictData, RainfallHistory, WaterLevelHistory, Alert, RiskLevel } from '@/types/flood';

export const calculateRiskLevel = (rainfall: number): RiskLevel => {
  if (rainfall > 50) return 'high';
  if (rainfall >= 20) return 'medium';
  return 'safe';
};

export const jakartaDistricts: DistrictData[] = [
  {
    id: 'jakarta-pusat',
    name: 'Jakarta Pusat',
    rainfall: 45,
    riskLevel: 'medium',
    coordinates: [-6.1862, 106.8341],
    isFloodProne: false,
    waterLevel: 35,
    population: '1.1 million',
    description:
      "Jakarta's central district, home to national government buildings and Monas. Drainage infrastructure is relatively modern, but dense urban development limits water absorption during heavy storms.",
  },
  {
    id: 'jakarta-utara',
    name: 'Jakarta Utara',
    rainfall: 68,
    riskLevel: 'high',
    coordinates: [-6.1386, 106.8826],
    isFloodProne: true,
    waterLevel: 85,
    population: '1.8 million',
    description:
      'A low-lying coastal district facing land subsidence and rising sea levels. Combined with heavy rainfall and tidal surges, this makes it the most flood-vulnerable area in Jakarta.',
  },
  {
    id: 'jakarta-barat',
    name: 'Jakarta Barat',
    rainfall: 32,
    riskLevel: 'medium',
    coordinates: [-6.1677, 106.7637],
    isFloodProne: true,
    waterLevel: 42,
    population: '2.4 million',
    description:
      'A densely populated western district crossed by several major rivers. Seasonal overflow from upstream areas often compounds local rainfall, raising flood risk during the wet season.',
  },
  {
    id: 'jakarta-selatan',
    name: 'Jakarta Selatan',
    rainfall: 15,
    riskLevel: 'safe',
    coordinates: [-6.2614, 106.8106],
    isFloodProne: false,
    waterLevel: 12,
    population: '2.2 million',
    description:
      'The highest-elevation district in Jakarta, with more green space and better natural drainage. Generally the safest area during the rainy season, though localized flash flooding can still occur.',
  },
  {
    id: 'jakarta-timur',
    name: 'Jakarta Timur',
    rainfall: 52,
    riskLevel: 'high',
    coordinates: [-6.2250, 106.9004],
    isFloodProne: true,
    waterLevel: 78,
    population: '2.9 million',
    description:
      "Jakarta's most populous district, sitting along the Ciliwung River. Upstream rainfall from Bogor and Depok frequently causes the river to overflow, affecting riverside neighborhoods.",
  },
];

export const rainfallHistory: RainfallHistory[] = [
  { date: '2025-09-20', rainfall: 18 },
  { date: '2025-09-21', rainfall: 25 },
  { date: '2025-09-22', rainfall: 32 },
  { date: '2025-09-23', rainfall: 15 },
  { date: '2025-09-24', rainfall: 22 },
  { date: '2025-09-25', rainfall: 38 },
  { date: '2025-09-26', rainfall: 45 },
  { date: '2025-09-27', rainfall: 52 },
  { date: '2025-09-28', rainfall: 48 },
  { date: '2025-09-29', rainfall: 35 },
  { date: '2025-09-30', rainfall: 28 },
  { date: '2025-10-01', rainfall: 42 },
  { date: '2025-10-02', rainfall: 55 },
  { date: '2025-10-03', rainfall: 62 },
  { date: '2025-10-04', rainfall: 48 },
  { date: '2025-10-05', rainfall: 38 },
  { date: '2025-10-06', rainfall: 45 },
  { date: '2025-10-07', rainfall: 32 },
  { date: '2025-10-08', rainfall: 28 },
  { date: '2025-10-09', rainfall: 35 },
  { date: '2025-10-10', rainfall: 42 },
  { date: '2025-10-11', rainfall: 28 },
  { date: '2025-10-12', rainfall: 35 },
  { date: '2025-10-13', rainfall: 42 },
  { date: '2025-10-14', rainfall: 55 },
  { date: '2025-10-15', rainfall: 48 },
  { date: '2025-10-16', rainfall: 38 },
  { date: '2025-10-17', rainfall: 45 },
  { date: '2025-10-18', rainfall: 52 },
  { date: '2025-10-19', rainfall: 58 },
];

export const waterLevelHistory: WaterLevelHistory[] = [
  { date: '2025-09-20', waterLevel: 35 },
  { date: '2025-09-21', waterLevel: 42 },
  { date: '2025-09-22', waterLevel: 48 },
  { date: '2025-09-23', waterLevel: 32 },
  { date: '2025-09-24', waterLevel: 38 },
  { date: '2025-09-25', waterLevel: 52 },
  { date: '2025-09-26', waterLevel: 58 },
  { date: '2025-09-27', waterLevel: 65 },
  { date: '2025-09-28', waterLevel: 62 },
  { date: '2025-09-29', waterLevel: 48 },
  { date: '2025-09-30', waterLevel: 42 },
  { date: '2025-10-01', waterLevel: 55 },
  { date: '2025-10-02', waterLevel: 68 },
  { date: '2025-10-03', waterLevel: 72 },
  { date: '2025-10-04', waterLevel: 65 },
  { date: '2025-10-05', waterLevel: 52 },
  { date: '2025-10-06', waterLevel: 58 },
  { date: '2025-10-07', waterLevel: 45 },
  { date: '2025-10-08', waterLevel: 42 },
  { date: '2025-10-09', waterLevel: 48 },
  { date: '2025-10-10', waterLevel: 55 },
  { date: '2025-10-11', waterLevel: 42 },
  { date: '2025-10-12', waterLevel: 48 },
  { date: '2025-10-13', waterLevel: 55 },
  { date: '2025-10-14', waterLevel: 68 },
  { date: '2025-10-15', waterLevel: 62 },
  { date: '2025-10-16', waterLevel: 52 },
  { date: '2025-10-17', waterLevel: 58 },
  { date: '2025-10-18', waterLevel: 65 },
  { date: '2025-10-19', waterLevel: 70 },
];

export const recentAlerts: Alert[] = [
  {
    id: '1',
    district: 'Jakarta Utara',
    level: 'high',
    message: 'High flood risk due to heavy rainfall (68mm). Residents advised to stay alert.',
    timestamp: '2025-10-19T08:30:00',
  },
  {
    id: '2',
    district: 'Jakarta Timur',
    level: 'high',
    message: 'Flood risk elevated. Rainfall reached 52mm in the last 24 hours.',
    timestamp: '2025-10-19T07:15:00',
  },
  {
    id: '3',
    district: 'Jakarta Pusat',
    level: 'medium',
    message: 'Moderate rainfall detected (45mm). Monitor conditions.',
    timestamp: '2025-10-18T18:00:00',
  },
  {
    id: '4',
    district: 'Jakarta Barat',
    level: 'medium',
    message: 'Water level rising due to persistent rainfall (32mm).',
    timestamp: '2025-10-18T14:30:00',
  },
  {
    id: '5',
    district: 'Jakarta Utara',
    level: 'high',
    message: 'Coastal flooding risk elevated due to high tide and rainfall.',
    timestamp: '2025-10-17T09:00:00',
  },
];

// Derives a plausible per-district history by scaling the citywide trend
// to match that district's current reading, so each detail page shows a
// realistic-looking trend line rather than reusing the same citywide chart.
export const getDistrictRainfallHistory = (district: DistrictData): RainfallHistory[] => {
  const cityToday = rainfallHistory[rainfallHistory.length - 1].rainfall;
  const scale = district.rainfall / cityToday;
  return rainfallHistory.map((entry) => ({
    date: entry.date,
    rainfall: Math.max(0, Math.round(entry.rainfall * scale)),
  }));
};

export const getDistrictWaterLevelHistory = (district: DistrictData): WaterLevelHistory[] => {
  const cityToday = waterLevelHistory[waterLevelHistory.length - 1].waterLevel;
  const scale = district.waterLevel / cityToday;
  return waterLevelHistory.map((entry) => ({
    date: entry.date,
    waterLevel: Math.max(0, Math.round(entry.waterLevel * scale)),
  }));
};

export const getSafetyTips = (district: DistrictData): string[] => {
  if (district.riskLevel === 'high') {
    return [
      'Avoid low-lying roads and underpasses that are prone to sudden flooding.',
      'Keep emergency supplies (water, flashlight, first aid) ready and easily accessible.',
      'Monitor official BPBD DKI Jakarta updates and be ready to evacuate if advised.',
      'Move vehicles and valuables to higher ground as a precaution.',
    ];
  }
  if (district.riskLevel === 'medium') {
    return [
      'Check local drainage and clear any blockages near your property.',
      'Stay alert to weather updates, especially during sustained heavy rain.',
      'Have an evacuation plan ready in case conditions worsen.',
    ];
  }
  return [
    'Conditions are currently stable — no special precautions needed.',
    'Continue to monitor forecasts during the rainy season (Oct–Mar).',
  ];
};

// Explains where each metric's numbers come from, shown in tooltips on the
// district detail page. In this demo the underlying values are mocked, but
// the sourcing described here reflects the kind of real feeds a production
// system would wire up.
export const metricSources = {
  rainfall: {
    label: 'Rainfall',
    source: 'BMKG automatic rain gauges',
    detail:
      'Aggregated from BMKG (Indonesian Agency for Meteorology, Climatology and Geophysics) rain gauge stations within the district, measuring accumulated rainfall in mm over the last 24 hours.',
  },
  waterLevel: {
    label: 'Water Level',
    source: 'BPBD DKI Jakarta AWLR sensors',
    detail:
      "Reported by BPBD DKI Jakarta's Automatic Water Level Recorders (AWLR) installed at key rivers, canals and floodgates, measuring water height in cm above the normal baseline.",
  },
  population: {
    label: 'Population',
    source: 'BPS Statistics Indonesia',
    detail:
      'Estimated resident population from the most recent BPS (Badan Pusat Statistik) district-level census and annual population projections.',
  },
  areaType: {
    label: 'Area Type',
    source: 'Jakarta flood risk mapping',
    detail:
      "Classified using historical flood incident records, land elevation, and drainage capacity data from Jakarta's flood risk mapping, maintained jointly by BPBD and Jakarta Smart City.",
  },
} as const;
