import type { Bus } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Clock, Users } from 'lucide-react';
import { Separator } from '../ui/separator';

interface BusDetailsProps {
  bus: Bus;
}

export default function BusDetails({ bus }: BusDetailsProps) {
  const getOccupancyColor = (level: number) => {
    if (level > 80) return 'bg-red-500';
    if (level > 50) return 'bg-yellow-500';
    return 'bg-green-500';
  };
  
  return (
    <Card className="mt-4 shadow-md">
      <CardHeader>
        <CardTitle className="font-headline text-xl">Bus {bus.id.toUpperCase()}</CardTitle>
        <CardDescription>Real-time details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-5 w-5" />
            <span className="font-medium">ETA</span>
          </div>
          <span className="font-bold text-lg text-primary">{bus.eta}</span>
        </div>
        <Separator />
        <div className="space-y-2">
           <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="h-5 w-5" />
              <span className="font-medium">Occupancy</span>
            </div>
            <span className="font-bold text-lg">{bus.occupancy}%</span>
          </div>
          <Progress value={bus.occupancy} className="h-3" indicatorClassName={getOccupancyColor(bus.occupancy)} />
        </div>
      </CardContent>
    </Card>
  );
}
