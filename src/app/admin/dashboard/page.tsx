
"use client";

import * as React from "react";
import { DashboardHeader } from "@/app/admin/components/dashboard/header";
import { kpiData } from '@/lib/data';
import { KpiCard } from '@/app/admin/components/dashboard/kpi-card';
import { DelayChart } from '@/app/admin/components/dashboard/delay-chart';
import { OccupancyChart } from '@/app/admin/components/dashboard/occupancy-chart';
import {
  Bus,
  Clock,
  Users,
  Gauge,
  Siren,
} from 'lucide-react';
import { AlertsList } from "@/app/admin/components/dashboard/alerts-list";
import MapView from "@/components/map/map-view";
import ControlPanel from "@/components/tracking/control-panel";
import type { Bus as BusType, Stop, Route as RouteType } from "@/lib/data";

export default function DashboardPage() {
  const [routes, setRoutes] = React.useState<RouteType[]>([]);
  const [stops, setStops] = React.useState<Stop[]>([]);
  const [buses, setBuses] = React.useState<BusType[]>([]);
  const [selectedRoute, setSelectedRoute] = React.useState<RouteType | null>(null);
  const [filteredStops, setFilteredStops] = React.useState<Stop[]>([]);
  const [filteredBuses, setFilteredBuses] = React.useState<BusType[]>([]);
  const [selectedBus, setSelectedBus] = React.useState<BusType | null>(null);

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
        setRoutes(routes);
        setStops(stops);
        setBuses(buses);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };
    fetchData();
  }, []);

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
    <div className="flex flex-col flex-1">
      <DashboardHeader pageTitle="Dashboard" />
      <main className="grid flex-1 gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-5">
        <div className="col-span-5 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <KpiCard
            title="Active Buses"
            value={kpiData.activeBuses}
            Icon={Bus}
            description="Buses currently in operation."
          />
          <KpiCard
            title="Avg. ETA Delay"
            value={kpiData.avgEtaDelay}
            unit="min"
            Icon={Clock}
            description="Average delay across all routes."
          />
          <KpiCard
            title="Avg. Occupancy"
            value={kpiData.avgOccupancy}
            unit="%"
            Icon={Users}
            description="Average passenger load."
          />
          <KpiCard
            title="Avg. Speed"
            value={kpiData.avgSpeed}
            unit="km/h"
            Icon={Gauge}
            description="Average speed of the fleet."
          />
          <KpiCard
            title="Active Alerts"
            value={kpiData.totalAlerts}
            Icon={Siren}
            description="Unresolved critical events."
          />
        </div>
        <div className="col-span-5 grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <MapView
              selectedBus={selectedBus}
              routeStops={filteredStops}
              selectedRoute={selectedRoute}
            />
          </div>
          <div className="lg:col-span-1">
            <ControlPanel
              routes={routes}
              stops={stops}
              buses={buses}
              onRouteSelect={handleRouteSelect}
              onBusSelect={handleBusSelect}
              selectedRouteId={selectedRoute?.id}
              selectedBusId={selectedBus?.id}
              selectedBus={selectedBus}
            />
          </div>
        </div>
        <div className="col-span-5 grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <OccupancyChart />
          </div>
          <div className="lg:col-span-2">
            <DelayChart />
          </div>
        </div>
        <div className="col-span-5">
          <AlertsList />
        </div>
      </main>
    </div>
  );
}
