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
  { id: '1', name: 'Route 101 - Amritsar to Ludhiana' },
  { id: '2', name: 'Route 202 - Chandigarh to Jalandhar' },
  { id: '3', name: 'Route 303 - Patiala to Bathinda' },
  { id: '4', name: 'Route 404 - Mohali IT Park Shuttle' },
];

export const stops: Stop[] = [
  // Amritsar to Ludhiana
  { id: 's1', name: 'Amritsar Bus Stand', routeId: '1', location: { lat: 31.6340, lng: 74.8723 } },
  { id: 's2', name: 'Jalandhar Bypass', routeId: '1', location: { lat: 31.3260, lng: 75.5762 } },
  { id: 's3', name: 'Phillaur', routeId: '1', location: { lat: 31.0253, lng: 75.7869 } },
  { id: 's4', name: 'Ludhiana Bus Stand', routeId: '1', location: { lat: 30.9110, lng: 75.8502 } },
  
  // Chandigarh to Jalandhar
  { id: 's5', name: 'ISBT Sector 17, Chandigarh', routeId: '2', location: { lat: 30.7415, lng: 76.7762 } },
  { id: 's6', name: 'Kharar', routeId: '2', location: { lat: 30.7423, lng: 76.6573 } },
  { id: 's7', name: 'Phagwara', routeId: '2', location: { lat: 31.2178, lng: 75.7726 } },
  { id: 's8', name: 'Jalandhar Bus Stand', routeId: '2', location: { lat: 31.3260, lng: 75.5762 } },
  
  // Patiala to Bathinda
  { id: 's9', name: 'Patiala Bus Stand', routeId: '3', location: { lat: 30.3398, lng: 76.3869 } },
  { id: 's10', name: 'Sangrur', routeId: '3', location: { lat: 30.2515, lng: 75.8373 } },
  { id: 's11', name: 'Barnala', routeId: '3', location: { lat: 30.3789, lng: 75.5422 } },
  { id: 's12', name: 'Bathinda Bus Stand', routeId: '3', location: { lat: 30.2110, lng: 74.9455 } },

  // Mohali IT Park Shuttle
  { id: 's13', name: 'Mohali Phase 8', routeId: '4', location: { lat: 30.7046, lng: 76.7179 } },
  { id: 's14', name: 'Sohana', routeId: '4', location: { lat: 30.6865, lng: 76.7231 } },
  { id: 's15', name: 'Quark City', routeId: '4', location: { lat: 30.7018, lng: 76.7641 } },
];

export const buses: Bus[] = [
  { id: 'pb01', routeId: '1', location: { lat: 31.55, lng: 75.05 }, occupancy: 65, eta: '15 min' },
  { id: 'pb02', routeId: '1', location: { lat: 31.15, lng: 75.65 }, occupancy: 30, eta: '32 min' },
  { id: 'pb03', routeId: '2', location: { lat: 30.73, lng: 76.70 }, occupancy: 80, eta: '8 min' },
  { id: 'pb04', routeId: '3', location: { lat: 30.29, lng: 76.05 }, occupancy: 45, eta: '20 min' },
  { id: 'pb05', routeId: '4', location: { lat: 30.69, lng: 76.74 }, occupancy: 95, eta: 'Arriving' },
];
