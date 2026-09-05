import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Card, CardContent } from '@/components/ui/card';
import { jakartaDistricts } from '@/data/mockData';

// Custom styles for tooltips
const tooltipStyles = `
  .district-label {
    background: transparent !important;
    border: none !important;
    box-shadow: none !important;
    font-weight: bold;
    font-size: 14px;
    color: white;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
  }
  .district-label::before {
    display: none !important;
  }
  .district-popup .leaflet-popup-content-wrapper {
    border-radius: 8px;
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleEl = document.createElement('style');
  styleEl.textContent = tooltipStyles;
  document.head.appendChild(styleEl);
}

// Fix for default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const riskColors = {
  safe: '#22c55e',
  medium: '#f59e0b',
  high: '#ef4444',
};

export const JakartaMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Initialize map centered on Jakarta
    map.current = L.map(mapContainer.current).setView([-6.2088, 106.8456], 11);

    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 18,
    }).addTo(map.current);

    // Add circle markers for each district
    jakartaDistricts.forEach((district) => {
      if (!map.current) return;

      const color = riskColors[district.riskLevel];
      
      // Create circle marker like the reference code
      const marker = L.circleMarker(district.coordinates, {
        radius: 22,
        color: color,
        fillColor: color,
        fillOpacity: 0.85,
        weight: 2
      }).addTo(map.current);

      // Add permanent tooltip showing rainfall value
      marker.bindTooltip(`<b>${district.rainfall}</b>`, {
        direction: 'center',
        permanent: true,
        className: `district-label district-label-${district.riskLevel}`
      });

      // Add click popup with district info
      marker.on('click', function() {
        if (!map.current) return;
        L.popup({ offset: [0, -10], className: 'district-popup' })
          .setLatLng(district.coordinates)
          .setContent(`
            <div style="min-width:220px; font-family: sans-serif;">
              <b style="font-size:1.2em;">${district.name}</b><br>
              <b>Rainfall:</b> ${district.rainfall}mm<br>
              <b>Water Level:</b> ${district.waterLevel}cm<br>
              <b>Area Type:</b> ${district.isFloodProne ? 'Flood-Prone Area' : 'Normal Area ✓'}<br>
              <b>Risk Level:</b> <span style="color:${color};font-weight:bold;text-transform:uppercase;">${district.riskLevel}</span>
            </div>
          `)
          .openOn(map.current);
      });
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  return (
    <Card className="overflow-hidden">
      <div className="relative">
        <div ref={mapContainer} className="w-full h-[300px] sm:h-[400px] lg:h-[500px]" />
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-[400] bg-card/90 backdrop-blur-sm border rounded-lg px-2.5 py-1 text-[11px] sm:text-xs text-muted-foreground shadow-sm">
          Numbers show rainfall in mm
        </div>
      </div>
      <CardContent className="p-3 sm:p-4 bg-muted/40 border-t">
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:gap-x-6 text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-risk-safe ring-4 ring-risk-safe/15" />
            <span className="whitespace-nowrap text-muted-foreground">Low <span className="text-foreground/70">(&lt;20mm)</span></span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-risk-medium ring-4 ring-risk-medium/15" />
            <span className="whitespace-nowrap text-muted-foreground">Medium <span className="text-foreground/70">(20–50mm)</span></span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-risk-high ring-4 ring-risk-high/15" />
            <span className="whitespace-nowrap text-muted-foreground">High <span className="text-foreground/70">(&gt;50mm)</span></span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
