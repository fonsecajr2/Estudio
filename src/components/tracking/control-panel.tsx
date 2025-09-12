'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RouteSelector from './route-selector';
import BusDetails from './bus-details';
import AiSuggester from './ai-suggester';
import type { Route, Stop, Bus } from '@/lib/data';
import { Map, Bot } from 'lucide-react';

interface ControlPanelProps {
  routes: Route[];
  stops: Stop[];
  buses: Bus[];
  selectedRouteId?: string;
  selectedBusId?: string;
  selectedBus: Bus | null;
  onRouteSelect: (routeId: string) => void;
  onBusSelect: (busId: string) => void;
}

export default function ControlPanel({
  routes,
  stops,
  buses,
  selectedRouteId,
  selectedBusId,
  selectedBus,
  onRouteSelect,
  onBusSelect,
}: ControlPanelProps) {
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
            stops={stops}
            buses={buses}
            onRouteSelect={onRouteSelect}
            onBusSelect={onBusSelect}
            selectedRouteId={selectedRouteId}
            selectedBusId={selectedBusId}
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
