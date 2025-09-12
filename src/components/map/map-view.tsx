'use client';

import { useState, useEffect, useRef } from 'react';
import Map, { Marker, Source, Layer, MapRef, Popup } from 'react-map-gl';
import { buses as initialBuses, stops as allStops } from '@/lib/data';
import type { Bus, Stop, Route } from '@/lib/data';
import { AlertTriangle, MapPin, Bus as BusIconLucide } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import type { Feature, LineString } from 'geojson';

const BusIcon = (props: React.SVGProps<SVGSVGElement> & { bus: Bus, isSelected: boolean }) => (
  <div className="relative">
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      className={props.isSelected ? 'animate-pulse' : ''}
    >
      <circle cx="18" cy="18" r="16" fill={props.isSelected ? "hsl(var(--accent))" : "hsl(var(--primary))"} stroke="hsl(var(--primary-foreground))" strokeWidth="2"/>
      <path
        d="M22 13H14L12 16V22H13V24H15V22H19V24H21V22H22L22 13Z"
        fill="hsl(var(--primary-foreground))"
      />
    </svg>
    {!props.isSelected && (
      <div className="absolute -top-6 -right-3 bg-card text-card-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-md whitespace-nowrap">
          {props.bus.eta}
      </div>
    )}
  </div>
);

interface MapViewProps {
  selectedBus: Bus | null;
  routeStops: Stop[];
  selectedRoute: Route | null;
}

export default function MapView({ selectedBus, routeStops, selectedRoute }: MapViewProps) {
  const MAPBOX_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
  const mapRef = useRef<MapRef | null>(null);

  const [buses, setBuses] = useState<Bus[]>(initialBuses);
   const [viewState, setViewState] = useState({
    longitude: 75.3412,
    latitude: 31.1471,
    zoom: 7,
    pitch: 0,
    bearing: 0,
  });

  const [routeGeoJSON, setRouteGeoJSON] = useState<Feature<LineString> | null>(null);
  const [hoveredStop, setHoveredStop] = useState<Stop | null>(null);
  
  // Animate bus locations
  useEffect(() => {
    const interval = setInterval(() => {
      setBuses((prevBuses) =>
        prevBuses.map((bus) => {
          const newLat = bus.location.lat + (Math.random() - 0.5) * 0.001;
          const newLng = bus.location.lng + (Math.random() - 0.5) * 0.001;
          return { ...bus, location: { lat: newLat, lng: newLng } };
        })
      );
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  // Handle zooming to selected bus
  useEffect(() => {
    if (selectedBus && mapRef.current) {
      mapRef.current.flyTo({
        center: [selectedBus.location.lng, selectedBus.location.lat],
        zoom: 14,
        pitch: 45,
        bearing: Math.random() * 90 - 45,
        duration: 2000,
      });
    } else if (!selectedRoute && mapRef.current) {
        mapRef.current.flyTo({
            center: [75.3412, 31.1471],
            zoom: 7,
            pitch: 0,
            bearing: 0,
            duration: 2000,
        });
    }
  }, [selectedBus, selectedRoute]);

  // Create route line when stops are available
  useEffect(() => {
    if (routeStops.length > 1) {
      const coordinates = routeStops.map(stop => [stop.location.lng, stop.location.lat]);
      const geojson: Feature<LineString> = {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: coordinates,
        },
      };
      setRouteGeoJSON(geojson);
    } else {
      setRouteGeoJSON(null);
    }
  }, [routeStops]);


  if (!MAPBOX_ACCESS_TOKEN) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-muted p-4">
        <Card className="max-w-md">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center gap-4">
                <AlertTriangle className="h-12 w-12 text-destructive" />
                <h2 className="text-xl font-semibold">Mapbox Access Token Missing</h2>
                <p className="text-muted-foreground">
                    Please add your Mapbox access token to your environment variables to display the map. Create a <code>.env</code> file in the root of your project and add the following line:
                </p>
                <code className="w-full text-left p-2 bg-slate-200 dark:bg-slate-800 rounded-md text-sm">
                    NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN="YOUR_ACCESS_TOKEN"
                </code>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const allBusesToShow = selectedRoute ? buses.filter(b => b.routeId === selectedRoute.id) : buses;

  return (
    <Map
      ref={mapRef}
      {...viewState}
      onMove={evt => setViewState(evt.viewState)}
      style={{width: '100%', height: '100%'}}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
    >
      {routeGeoJSON && (
         <Source id="route" type="geojson" data={routeGeoJSON}>
          <Layer
            id="route"
            type="line"
            source="route"
            layout={{
              'line-join': 'round',
              'line-cap': 'round',
            }}
            paint={{
              'line-color': 'hsl(var(--primary))',
              'line-width': 4,
              'line-opacity': 0.7,
            }}
          />
        </Source>
      )}

      {routeStops.map((stop) => (
        <Marker key={stop.id} longitude={stop.location.lng} latitude={stop.location.lat} anchor="bottom">
           <div 
             className="cursor-pointer"
             onMouseEnter={() => setHoveredStop(stop)}
             onMouseLeave={() => setHoveredStop(null)}
           >
              <MapPin className="h-6 w-6 text-primary fill-primary/30" />
           </div>
        </Marker>
      ))}

       {hoveredStop && (
        <Popup
          longitude={hoveredStop.location.lng}
          latitude={hoveredStop.location.lat}
          closeButton={false}
          closeOnClick={false}
          offset={20}
          anchor="bottom"
          className="font-sans"
        >
          <div className="text-sm font-semibold">{hoveredStop.name}</div>
        </Popup>
      )}

      {allBusesToShow.map((bus) => (
        <Marker key={bus.id} longitude={bus.location.lng} latitude={bus.location.lat} anchor="center">
          <BusIcon bus={bus} isSelected={bus.id === selectedBus?.id}/>
        </Marker>
      ))}

      {selectedBus && (
        <Popup
            longitude={selectedBus.location.lng}
            latitude={selectedBus.location.lat}
            closeButton={false}
            closeOnClick={false}
            offset={40}
            anchor="bottom"
        >
            <div className="flex items-center gap-2 bg-card text-card-foreground p-2 rounded-lg shadow-lg">
                <BusIconLucide className="h-5 w-5 text-accent" />
                <div>
                    <div className="font-bold text-base">Bus {selectedBus.id.toUpperCase()}</div>
                    <div className="text-xs text-muted-foreground">{selectedBus.eta} to next stop</div>
                </div>
            </div>
        </Popup>
      )}
    </Map>
  );
}
