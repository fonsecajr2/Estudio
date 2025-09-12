'use client';

import { useState, useEffect } from 'react';
import Map, { Marker } from 'react-map-gl';
import { buses as initialBuses } from '@/lib/data';
import type { Bus } from '@/lib/data';
import { AlertTriangle } from 'lucide-react';
import { Card, CardContent } from '../ui/card';

const BusIcon = (props: React.SVGProps<SVGSVGElement> & { bus: Bus }) => (
  <div className="relative">
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="18" cy="18" r="16" fill="hsl(var(--primary))" stroke="hsl(var(--primary-foreground))" strokeWidth="2"/>
      <path
        d="M22 13H14L12 16V22H13V24H15V22H19V24H21V22H22L22 13Z"
        fill="hsl(var(--primary-foreground))"
      />
    </svg>
    <div className="absolute -top-6 -right-3 bg-card text-card-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-md whitespace-nowrap">
        {props.bus.eta}
    </div>
  </div>
);


export default function MapView() {
  const MAPBOX_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
  
  const [buses, setBuses] = useState<Bus[]>(initialBuses);
  const [viewState, setViewState] = useState({
    longitude: -73.935242,
    latitude: 40.73061,
    zoom: 12
  });

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

  return (
    <Map
      {...viewState}
      onMove={evt => setViewState(evt.viewState)}
      style={{width: '100%', height: '100%'}}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
    >
      {buses.map((bus) => (
        <Marker key={bus.id} longitude={bus.location.lng} latitude={bus.location.lat}>
          <BusIcon bus={bus}/>
        </Marker>
      ))}
    </Map>
  );
}
