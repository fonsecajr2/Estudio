"use client";

import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  useMap,
} from "@vis.gl/react-google-maps";
import type { Bus, Route, Stop } from "@/lib/types";
import { BusFront, MapPin } from "lucide-react";
import { useEffect, useState } from "react";

interface MapViewProps {
  buses: Bus[];
  route: Route | undefined;
  selectedStop: Stop | null;
  onStopSelect: (stop: Stop) => void;
  selectedBus: Bus | null;
  onBusSelect: (bus: Bus) => void;
}

const mapId = "smart_transit_map";

const BusMarker = ({ bus, isSelected }: { bus: Bus, isSelected: boolean }) => {
  const occupancyColor = () => {
    switch (bus.congestion) {
      case "Low":
        return "text-green-500";
      case "Medium":
        return "text-yellow-500";
      case "High":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="relative">
      <div className={`absolute -translate-x-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm p-2 rounded-full shadow-lg transition-all ${isSelected ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''}`}>
        <BusFront className={`h-6 w-6 ${occupancyColor()}`} strokeWidth={2.5}/>
      </div>
    </div>
  );
};

function RoutePolyline({ route }: { route: Route }) {
  const map = useMap();
  const [polyline, setPolyline] = useState<google.maps.Polyline | null>(null);

  useEffect(() => {
    if (!map || !route) {
      return;
    }

    if (polyline) {
      polyline.setMap(null);
    }

    const newPolyline = new google.maps.Polyline({
      path: route.stops.map((stop) => ({ lat: stop.location.lat, lng: stop.location.lng })),
      strokeColor: '#4285F4',
      strokeOpacity: 0.8,
      strokeWeight: 5,
    });

    newPolyline.setMap(map);
    setPolyline(newPolyline);

    return () => {
      newPolyline.setMap(null);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, route]);

  return null;
}


export default function FleetMap({
  buses,
  route,
  selectedStop,
  onStopSelect,
  selectedBus,
  onBusSelect
}: MapViewProps) {
  const defaultCenter = { lat: 38.736946, lng: -9.142685 };

  const routeBuses = buses?.filter((bus) => bus.routeId === route?.id);

  return (
    <div className="w-full h-full">
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
            <Map
                defaultCenter={defaultCenter}
                defaultZoom={13}
                mapId={mapId}
                gestureHandling={"greedy"}
                disableDefaultUI={true}
                style={{ width: "100%", height: "100%" }}
            >
                {route && (
                <>
                    <RoutePolyline route={route} />
                    {route.stops.map((stop) => (
                    <AdvancedMarker
                        key={stop.id}
                        position={{ lat: stop.location.lat, lng: stop.location.lng }}
                        onClick={() => onStopSelect(stop)}
                    >
                        <Pin
                        background={selectedStop?.id === stop.id ? "hsl(var(--primary))" : "#FFF"}
                        borderColor={selectedStop?.id === stop.id ? "hsl(var(--primary))" : "#000"}
                        glyphColor={selectedStop?.id === stop.id ? "#FFF" : "#000"}
                        >
                        <MapPin className="w-4 h-4"/>
                        </Pin>
                    </AdvancedMarker>
                    ))}
                </>
                )}
                {routeBuses && routeBuses.map((bus) => (
                <AdvancedMarker
                    key={bus.id}
                    position={{ lat: bus.location.lat, lng: bus.location.lng }}
                    onClick={() => onBusSelect(bus)}
                >
                    <BusMarker bus={bus} isSelected={selectedBus?.id === bus.id} />
                </AdvancedMarker>
                ))}
            </Map>
        </APIProvider>
    </div>
  );
}
