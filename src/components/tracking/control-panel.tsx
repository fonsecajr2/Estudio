'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RouteSelector from './route-selector';
import BusDetails from './bus-details';
import AiSuggester from './ai-suggester';
import { routes, stops, buses, type Route, type Stop, type Bus } from '@/lib/data';
import { Map, Bot } from 'lucide-react';

export default function ControlPanel() {
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [filteredStops, setFilteredStops] = useState<Stop[]>([]);
  const [filteredBuses, setFilteredBuses] = useState<Bus[]>([]);
  const [selectedBus, setSelectedBus] = useState<Bus | null>(null);

  const handleRouteSelect = (routeId: string) => {
    const route = routes.find((r) => r.id === routeId) || null;
    setSelectedRoute(route);
    if (route) {
      setFilteredStops(stops.filter((s) => s.routeId === routeId));
      setFilteredBuses(buses.filter((b) => b.routeId === routeId));
    } else {
      setFilteredStops([]);
      setFilteredBuses([]);
    }
    setSelectedBus(null);
  };

  const handleBusSelect = (busId: string) => {
    const bus = buses.find((b) => b.id === busId) || null;
    setSelectedBus(bus);
  };

  return (
    <Tabs defaultValue="routes" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="routes">
          <Map className="mr-2 h-4 w-4" />
          Routes
        </TabsTrigger>
        <TabsTrigger value="ai">
          <Bot className="mr-2 h-4 w-4" />
          AI Suggest
        </TabsTrigger>
      </TabsList>
      <TabsContent value="routes" className="mt-4">
        <div id="routes" className="space-y-4">
          <RouteSelector
            routes={routes}
            stops={filteredStops}
            buses={filteredBuses}
            onRouteSelect={handleRouteSelect}
            onBusSelect={handleBusSelect}
            selectedRouteId={selectedRoute?.id}
            selectedBusId={selectedBus?.id}
          />
          {selectedBus && <BusDetails bus={selectedBus} />}
        </div>
      </TabsContent>
      <TabsContent value="ai" className="mt-4">
        <AiSuggester />
      </TabsContent>
    </Tabs>
  );
}
