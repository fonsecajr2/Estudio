'use client';

import { useFormState } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { detectAnomalousBusBehavior, DetectAnomalousBusBehaviorOutput } from '@/ai/flows/detect-anomalous-bus-behavior';
import { AlertTriangle, Bot, CheckCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

const formSchema = z.object({
  busId: z.string().min(1, "Bus ID is required."),
  latitude: z.coerce.number(),
  longitude: z.coerce.number(),
  speed: z.coerce.number().min(0),
  lastStopDepartureTime: z.string().datetime(),
  routeId: z.string().min(1, "Route ID is required."),
});

type FormValues = z.infer<typeof formSchema>;

const initialState: DetectAnomalousBusBehaviorOutput | null = null;

export function AnomalyDetector() {
  const [state, formAction] = useFormState(detectAnomalousBusBehavior, initialState);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      busId: "BUS001",
      latitude: 38.715,
      longitude: -9.140,
      speed: 30,
      lastStopDepartureTime: new Date().toISOString(),
      routeId: "R01",
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
            <Bot /> AI Anomaly Detection
        </CardTitle>
        <CardDescription>
          Manually input bus data to check for anomalous behavior using the AI engine.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6 md:grid-cols-2">
        <Form {...form}>
          <form action={formAction} className="space-y-4">
            <FormField
              control={form.control}
              name="busId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bus ID</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., BUS001" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
                 <FormField
                    control={form.control}
                    name="latitude"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Latitude</FormLabel>
                        <FormControl>
                            <Input type="number" step="0.0001" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                <FormField
                    control={form.control}
                    name="longitude"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Longitude</FormLabel>
                        <FormControl>
                            <Input type="number" step="0.0001" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
            </div>
            <FormField
              control={form.control}
              name="speed"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Speed (km/h)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="lastStopDepartureTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Departure Time</FormLabel>
                  <FormControl>
                    <Input type="datetime-local" {...field} value={field.value.substring(0,16)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="routeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Route ID</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., R01" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Analyze Behavior</Button>
          </form>
        </Form>
        <div className="flex items-center justify-center">
            {state ? (
                state.isAnomalous ? (
                    <Alert variant="destructive">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle className="font-headline">{state.anomalyType || 'Anomaly Detected!'}</AlertTitle>
                        <AlertDescription>{state.anomalyDescription}</AlertDescription>
                    </Alert>
                ) : (
                    <Alert className="border-green-500 text-green-700">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <AlertTitle className="font-headline text-green-700">No Anomaly Detected</AlertTitle>
                        <AlertDescription className="text-green-600">Bus behavior appears to be normal.</AlertDescription>
                    </Alert>
                )
            ) : (
                 <div className='text-center text-muted-foreground'>
                    <Bot size={48} className='mx-auto mb-2' />
                    <p>Analysis results will be displayed here.</p>
                 </div>
            )}
        </div>
      </CardContent>
    </Card>
  );
}
