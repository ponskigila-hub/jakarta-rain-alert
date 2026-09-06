// Client for NASA's EONET (Earth Observatory Natural Event Tracker) API.
// Public, no API key required, CORS-enabled for browser fetches.
// Docs: https://eonet.gsfc.nasa.gov/docs/v3

export interface EonetEvent {
  id: string;
  title: string;
  category: string;
  lat: number;
  lng: number;
  date: string;
  link: string;
}

const EONET_URL =
  'https://eonet.gsfc.nasa.gov/api/v3/events?category=floods,severeStorms&status=open&limit=75';

interface RawGeometry {
  date: string;
  type: 'Point' | 'Polygon' | string;
  coordinates: any;
}

interface RawEvent {
  id: string;
  title: string;
  link: string;
  categories?: { id: string; title: string }[];
  sources?: { id: string; url: string }[];
  geometry?: RawGeometry[];
}

// Pull a representative [lng, lat] pair out of whatever geometry shape EONET
// gives us (most events are Points; some storms are Polygons).
const extractLngLat = (geometry: RawGeometry): [number, number] | null => {
  if (geometry.type === 'Point' && Array.isArray(geometry.coordinates)) {
    const [lng, lat] = geometry.coordinates;
    return typeof lng === 'number' && typeof lat === 'number' ? [lng, lat] : null;
  }
  if (geometry.type === 'Polygon') {
    const ring = geometry.coordinates?.[0];
    const first = ring?.[0];
    if (Array.isArray(first) && typeof first[0] === 'number' && typeof first[1] === 'number') {
      return [first[0], first[1]];
    }
  }
  return null;
};

export const fetchFloodStormEvents = async (): Promise<EonetEvent[]> => {
  const res = await fetch(EONET_URL);
  if (!res.ok) throw new Error(`EONET request failed: ${res.status}`);
  const data = await res.json();
  const rawEvents: RawEvent[] = data?.events ?? [];

  const events: EonetEvent[] = [];
  for (const ev of rawEvents) {
    const geometry = ev.geometry?.[ev.geometry.length - 1]; // most recent reading
    if (!geometry) continue;
    const coords = extractLngLat(geometry);
    if (!coords) continue;
    const [lng, lat] = coords;

    events.push({
      id: ev.id,
      title: ev.title,
      category: ev.categories?.[0]?.title ?? 'Event',
      lat,
      lng,
      date: geometry.date,
      link: ev.sources?.[0]?.url || ev.link,
    });
  }
  return events;
};
