'use client';

import { useState, useEffect, useMemo } from 'react';
import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';
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
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const MAP_ID = process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID || 'DEMO_MAP_ID';
  const position = { lat: 40.73061, lng: -73.935242 };

  const [buses, setBuses] = useState<Bus[]>(initialBuses);

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
  
  const mapOptions = useMemo(() => ({
      mapId: MAP_ID,
      disableDefaultUI: true,
      gestureHandling: 'greedy',
      styles: [
        {
            "featureType": "all",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#7c93a3"
                },
                {
                    "lightness": "-10"
                }
            ]
        },
        {
            "featureType": "administrative.country",
            "elementType": "geometry",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "administrative.country",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#a0a4a5"
                }
            ]
        },
        {
            "featureType": "administrative.province",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#62838e"
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#dde3e3"
                }
            ]
        },
        {
            "featureType": "landscape.man_made",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#3f4a51"
                },
                {
                    "weight": "0.30"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "poi.attraction",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "poi.business",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi.government",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "poi.school",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "all",
            "stylers": [
                {
                    "saturation": -100
                },
                {
                    "lightness": 45
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#ffffff"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#c1d1d6"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "all",
            "stylers": [
                {
                    "color": "#a2daf2"
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#a2daf2"
                }
            ]
        }
    ],
  }), [MAP_ID]);

  if (!API_KEY) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-muted p-4">
        <Card className="max-w-md">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center gap-4">
                <AlertTriangle className="h-12 w-12 text-destructive" />
                <h2 className="text-xl font-semibold">Google Maps API Key Missing</h2>
                <p className="text-muted-foreground">
                    Please add your Google Maps API key to your environment variables to display the map. Create a <code>.env.local</code> file in the root of your project and add the following line:
                </p>
                <code className="w-full text-left p-2 bg-slate-200 dark:bg-slate-800 rounded-md text-sm">
                    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="YOUR_API_KEY"
                </code>
                 <p className="text-muted-foreground text-sm">You may also want to provide a Map ID via NEXT_PUBLIC_GOOGLE_MAPS_ID for custom styling.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <APIProvider apiKey={API_KEY}>
      <Map
        defaultCenter={position}
        defaultZoom={12}
        options={mapOptions}
      >
        {buses.map((bus) => (
          <AdvancedMarker key={bus.id} position={bus.location}>
            <BusIcon bus={bus}/>
          </AdvancedMarker>
        ))}
      </Map>
    </APIProvider>
  );
}
