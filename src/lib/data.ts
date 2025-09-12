export type Bus = {
  id: string;
  routeId: string;
  location: { lat: number; lng: number };
  occupancy: number;
  eta: string;
};

export type Route = {
  id: string;
  name: string;
};

export type Stop = {
  id: string;
  name: string;
  routeId: string;
  location: { lat: number; lng: number };
};

export const routes: Route[] = [
  { id: '1', name: 'Route 101 - Downtown Express' },
  { id: '2', name: 'Route 202 - Crosstown' },
  { id: '3', name: 'Route 303 - University Line' },
  { id: '4', name: 'Route 404 - Airport Shuttle' },
];

export const stops: Stop[] = [
  { id: 's1', name: 'Central Station', routeId: '1', location: { lat: 40.7128, lng: -74.0060 } },
  { id: 's2', name: 'City Hall', routeId: '1', location: { lat: 40.7145, lng: -74.0082 } },
  { id: 's3', name: 'Financial District', routeId: '1', location: { lat: 40.7075, lng: -74.0113 } },
  
  { id: 's4', name: 'Midtown Mall', routeId: '2', location: { lat: 40.7549, lng: -73.9840 } },
  { id: 's5', name: 'Green Park', routeId: '2', location: { lat: 40.7680, lng: -73.9822 } },
  { id: 's6', name: 'Eastside Library', routeId: '2', location: { lat: 40.7590, lng: -73.9694 } },
  
  { id: 's7', name: 'Science Building', routeId: '3', location: { lat: 40.7291, lng: -73.9965 } },
  { id: 's8', name: 'Main Campus', routeId: '3', location: { lat: 40.7308, lng: -73.9975 } },
  { id: 's9', name: 'Student Dorms', routeId: '3', location: { lat: 40.7325, lng: -73.9985 } },

  { id: 's10', name: 'Terminal A', routeId: '4', location: { lat: 40.6413, lng: -73.7781 } },
  { id: 's11', name: 'Terminal B', routeId: '4', location: { lat: 40.6443, lng: -73.7822 } },
];

export const buses: Bus[] = [
  { id: 'b1', routeId: '1', location: { lat: 40.7135, lng: -74.0071 }, occupancy: 65, eta: '5 min' },
  { id: 'b2', routeId: '1', location: { lat: 40.7090, lng: -74.0100 }, occupancy: 30, eta: '12 min' },
  { id: 'b3', routeId: '2', location: { lat: 40.7600, lng: -73.9750 }, occupancy: 80, eta: '8 min' },
  { id: 'b4', routeId: '3', location: { lat: 40.7300, lng: -73.9970 }, occupancy: 45, eta: '3 min' },
  { id: 'b5', routeId: '4', location: { lat: 40.6425, lng: -73.7800 }, occupancy: 95, eta: 'Arriving' },
];
