"use client";

import { useState } from "react";
import { buses, routes } from "@/lib/data";
import type { Bus, Route, Stop } from "@/lib/types";
import FleetMap from "@/components/dashboard/fleet-map";

export default function FleetContainer() {
  const [selectedRouteId, setSelectedRouteId] = useState<string | null>(routes[0].id);
  const [selectedStop, setSelectedStop] = useState<Stop | null>(null);
  const [selectedBus, setSelectedBus] = useState<Bus | null>(null);

  const selectedRoute = routes.find((r) => r.id === selectedRouteId);

  const handleStopSelect = (stop: Stop) => {
    setSelectedStop(stop);
    setSelectedBus(null);
  };

  const handleBusSelect = (bus: Bus) => {
    setSelectedBus(bus);
    setSelectedStop(null);
  };
  
  return (
      <FleetMap
        buses={buses}
        route={selectedRoute}
        selectedStop={selectedStop}
        onStopSelect={handleStopSelect}
        selectedBus={selectedBus}
        onBusSelect={handleBusSelect}
      />
  );
}
