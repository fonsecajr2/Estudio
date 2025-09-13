
"use client";

import * as React from "react";
import { BusFront, Route, User, Wifi } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import MapView from "@/components/map/map-view";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import type { Bus, Stop, Route as RouteType } from "@/lib/data";

// Informações básicas do motorista logado (deve vir de um sistema de autenticação)
const driverData = {
  name: "Aman Singh",
  driverId: "driver-1",
  busNumber: "PB10AB1234",
};

export default function DriverDashboard() {
  const { toast } = useToast();
  const [allRoutes, setAllRoutes] = React.useState<RouteType[]>([]);
  const [allStops, setAllStops] = React.useState<Stop[]>([]);
  const [allBuses, setAllBuses] = React.useState<Bus[]>([]);
  const [trip, setTrip] = React.useState(null);
  const [occupancy, setOccupancy] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [isStartingTrip, setIsStartingTrip] = React.useState(false);
  const [isEndingTrip, setIsEndingTrip] = React.useState(false);
  const [isUpdatingOccupancy, setIsUpdatingOccupancy] = React.useState(false);

  const bus = React.useMemo<Bus | undefined>(
    () => allBuses.find((b) => b.id === driverData.busNumber),
    [allBuses]
  );

  const route = React.useMemo<RouteType | undefined>(
    () => allRoutes.find((r) => r.id === bus?.routeId),
    [allRoutes, bus]
  );

  const routeStops = React.useMemo<Stop[]>(() => {
    if (!route) return [];  
    return allStops.filter((s) => s.routeId === route.id);
  }, [allStops, route]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [routesRes, stopsRes, busesRes] = await Promise.all([
          fetch("/api/routes"),
          fetch("/api/stops"),
          fetch("/api/buses"),
        ]);
        const routes = await routesRes.json();
        const stops = await stopsRes.json();
        const buses = await busesRes.json();
        setAllRoutes(routes);
        setAllStops(stops);
        setAllBuses(buses);
      } catch (error) {
        console.error("Failed to fetch data", error);
        toast({ title: "Error", description: "Failed to fetch data.", variant: "destructive" });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [toast]);

  const handleStartTrip = async () => {
    if (!bus) return;
    setIsStartingTrip(true);
    try {
      const response = await fetch("/api/trips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ driverId: driverData.driverId, busId: bus.id, routeId: bus.routeId }),
      });
      const newTrip = await response.json();
      setTrip(newTrip);
      toast({ title: "Trip Started", description: "Your trip has started and is now being tracked." });
    } catch (error) {
      console.error("Failed to start trip", error);
      toast({ title: "Error", description: "Failed to start trip.", variant: "destructive" });
    } finally {
      setIsStartingTrip(false);
    }
  };

  const handleEndTrip = async () => {
    if (!trip) return;
    setIsEndingTrip(true);
    try {
      const response = await fetch(`/api/trips/${(trip as any).id}`, {
        method: "PUT",
      });
      const endedTrip = await response.json();
      setTrip(endedTrip);
      toast({ title: "Trip Ended", description: "Your trip has ended." });
    } catch (error) {
      console.error("Failed to end trip", error);
      toast({ title: "Error", description: "Failed to end trip.", variant: "destructive" });
    } finally {
      setIsEndingTrip(false);
    }
  };

  const handleUpdateOccupancy = async () => {
    if (!bus) return;
    setIsUpdatingOccupancy(true);
    try {
      await fetch(`/api/buses/${bus.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ occupancy }),
      });
      toast({ title: "Occupancy Updated", description: `Occupancy set to ${occupancy}.` });
    } catch (error) {
      console.error("Failed to update occupancy", error);
      toast({ title: "Error", description: "Failed to update occupancy.", variant: "destructive" });
    } finally {
      setIsUpdatingOccupancy(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-dvh w-full flex-col bg-background">
      <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between border-b bg-card px-4 md:px-6">
        <div className="flex items-center gap-4">
          <Link href="/" aria-label="Back to home">
            <Button variant="outline" size="icon" className="h-9 w-9">
              <BusFront className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-semibold">Driver Dashboard</h1>
        </div>
        <Link href="/profile" className="flex items-center gap-2">
          <User className="h-7 w-7 text-primary" />
          <span className="hidden font-bold text-foreground sm:inline">
            {driverData.name}
          </span>
        </Link>
      </header>

      <div className="flex flex-1 flex-col md:flex-row">
        <aside className="w-full flex-col border-b bg-card p-4 shadow-lg md:w-96 md:border-r md:border-b-0">
          <Card className="w-full border-none bg-transparent shadow-none">
            <CardHeader className="p-2">
              <CardTitle className="text-2xl">Welcome, {driverData.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-2">
              <div>
                <h2 className="mb-2 font-semibold text-muted-foreground">Your Bus</h2>
                <div className="flex items-center gap-4">
                  <BusFront className="h-8 w-8 text-primary" />
                  <div>
                    <div>Bus: <span className="font-mono">{driverData.busNumber}</span></div>
                    <div>Driver ID: <span className="font-mono">{driverData.driverId}</span></div>
                  </div>
                </div>
              </div>

              <Separator />

              {trip && (trip as any).status === 'ongoing' ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-green-500">
                    <Wifi className="h-5 w-5" />
                    <span className="font-semibold">Tracking Active</span>
                  </div>
                  <Button onClick={handleEndTrip} className="w-full" disabled={isEndingTrip}>
                    {isEndingTrip ? "Ending Trip..." : "End Trip"}
                  </Button>
                </div>
              ) : (
                <Button onClick={handleStartTrip} className="w-full" disabled={isStartingTrip}>
                  {isStartingTrip ? "Starting Trip..." : "Start Trip"}
                </Button>
              )}

              <Separator />

              <div>
                <h2 className="mb-2 font-semibold text-muted-foreground">Update Occupancy</h2>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    value={occupancy}
                    onChange={(e) => setOccupancy(Number(e.target.value))}
                    placeholder="Enter occupancy"
                    disabled={isUpdatingOccupancy}
                  />
                  <Button onClick={handleUpdateOccupancy} disabled={isUpdatingOccupancy}>
                    {isUpdatingOccupancy ? "Updating..." : "Update"}
                  </Button>
                </div>
              </div>

              <Separator />

              {route && (
                <div>
                  <h2 className="mb-2 font-semibold text-muted-foreground">Attributed Route</h2>
                  <div className="mb-2 flex items-center gap-2">
                    <Route className="h-6 w-6 text-emerald-600" />
                    <span className="font-bold">{route.name}</span>
                  </div>
                  <div>
                    <div className="mt-2">
                      <span className="font-semibold">Stops:</span>
                      <ul className="ml-6 list-disc">
                        {routeStops.map((stop) => (
                          <li key={stop.id}>{stop.name}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

            </CardContent>
          </Card>
        </aside>

        <main className="flex-1">
          <MapView
            selectedBus={bus || null}
            routeStops={routeStops}
            selectedRoute={route || null}
          />
        </main>
      </div>
    </div>
  );
}
