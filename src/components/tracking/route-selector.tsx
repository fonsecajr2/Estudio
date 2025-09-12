import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Route, Stop, Bus } from '@/lib/data';
import { BusFront, MapPin } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface RouteSelectorProps {
  routes: Route[];
  stops: Stop[];
  buses: Bus[];
  selectedRouteId?: string;
  selectedBusId?: string;
  onRouteSelect: (routeId: string) => void;
  onBusSelect: (busId: string) => void;
}

export default function RouteSelector({
  routes,
  stops,
  buses,
  selectedRouteId,
  selectedBusId,
  onRouteSelect,
  onBusSelect,
}: RouteSelectorProps) {
  return (
    <Card className="bg-transparent border-0 shadow-none md:bg-card md:border md:shadow-sm">
      <CardHeader>
        <CardTitle className="font-headline">Select a Route</CardTitle>
        <CardDescription>Choose a bus route to see its stops and live bus locations.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Select onValueChange={onRouteSelect} value={selectedRouteId}>
          <SelectTrigger>
            <SelectValue placeholder="Choose a route..." />
          </SelectTrigger>
          <SelectContent>
            {routes.map((route) => (
              <SelectItem key={route.id} value={route.id}>
                {route.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {selectedRouteId && (
          <>
            <div>
              <h3 className="font-semibold mb-2 text-sm text-muted-foreground">Active Buses</h3>
              {buses.length > 0 ? (
                <div className="space-y-2">
                  {buses.map((bus) => (
                    <Button
                      key={bus.id}
                      variant={selectedBusId === bus.id ? 'default' : 'outline'}
                      className="w-full justify-start"
                      onClick={() => onBusSelect(bus.id)}
                    >
                      <BusFront className="mr-2 h-4 w-4" />
                      Bus {bus.id.toUpperCase()} - ETA: {bus.eta}
                    </Button>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-2">No active buses on this route.</p>
              )}
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-sm text-muted-foreground">Stops</h3>
              <ScrollArea className="h-48 rounded-md border p-2">
                {stops.map((stop, index) => (
                  <div key={stop.id} className="flex items-center p-2 rounded-md hover:bg-accent/10">
                    <MapPin className="h-4 w-4 mr-3 text-primary" />
                    <span className="text-sm">{stop.name}</span>
                  </div>
                ))}
              </ScrollArea>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
