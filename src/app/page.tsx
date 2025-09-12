'use client';

import { useState } from 'react';
import Header from '@/components/layout/header';
import BottomNav from '@/components/layout/bottom-nav';
import ControlPanel from '@/components/tracking/control-panel';
import MapView from '@/components/map/map-view';
import { routes, stops, buses, type Route, type Stop, type Bus } from '@/lib/data';

export default function Home() {
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [filteredStops, setFilteredStops] = useState<Stop[]>([]);
  const [filteredBuses, setFilteredBuses] = useState<Bus[]>([]);
  const [selectedBus, setSelectedBus] = useState<Bus | null>(null);

  const handleRouteSelect = (routeId: string) => {
    const route = routes.find((r) => r.id === routeId) || null;
    setSelectedRoute(route);
    if (route) {
      const newFilteredStops = stops.filter((s) => s.routeId === routeId);
      setFilteredStops(newFilteredStops);
      setFilteredBuses(buses.filter((b) => b.routeId === routeId));
    } else {
      setFilteredStops([]);
      setFilteredBuses([]);
    }
    setSelectedBus(null); // Reset bus selection when route changes
  };

  const handleBusSelect = (busId: string) => {
    const bus = buses.find((b) => b.id === busId) || null;
    setSelectedBus(bus);
  };

  return (
    <div className="flex flex-col h-dvh bg-background font-body">
      <Header />
      <main className="flex flex-1 flex-col md:flex-row overflow-hidden">
        <div className="w-full md:w-[350px] lg:w-[400px] h-2/5 md:h-full overflow-y-auto p-4 border-t md:border-t-0 md:border-r bg-card md:bg-transparent">
           <ControlPanel
            routes={routes}
            stops={filteredStops}
            buses={filteredBuses}
            onRouteSelect={handleRouteSelect}
            onBusSelect={handleBusSelect}
            selectedRouteId={selectedRoute?.id}
            selectedBusId={selectedBus?.id}
            selectedBus={selectedBus}
          />
        </div>
        <div className="flex-1 h-3/5 md:h-full">
          <MapView
            selectedBus={selectedBus}
            routeStops={filteredStops}
            selectedRoute={selectedRoute}
          />
        </div>
      </main>
      <BottomNav />
      {/* Spacer for bottom nav */}
      <div className="md:hidden h-16"></div>
    </div>
  );
}
