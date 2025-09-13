'use client';

import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
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
import { delayData } from '@/lib/data';

const chartConfig = {
  delay: {
    label: 'Delay (min)',
    color: 'hsl(var(--primary))',
  },
};

export function DelayChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='font-headline'>ETA Delay Evolution</CardTitle>
        <CardDescription>Average delay of all routes throughout the day.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <LineChart data={delayData} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `${value} min`}
            />
             <Tooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
            <Line
              dataKey="delay"
              type="monotone"
              stroke="var(--color-delay)"
              strokeWidth={2}
              dot={true}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
