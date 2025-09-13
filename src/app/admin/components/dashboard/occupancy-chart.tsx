'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { occupancyData } from '@/lib/data';

const chartConfig = {
  occupancy: {
    label: 'Occupancy',
    color: 'hsl(var(--accent))',
  },
};

export function OccupancyChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='font-headline'>Route Occupancy Comparison</CardTitle>
        <CardDescription>Average occupancy percentage by route.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <BarChart data={occupancyData} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="route"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis 
                tickLine={false} 
                axisLine={false} 
                tickMargin={8} 
                tickFormatter={(value) => `${value}%`}
            />
            <Tooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
            <Bar dataKey="occupancy" fill="var(--color-occupancy)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
