'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { getRouteSuggestion } from '@/app/actions';
import { routes } from '@/lib/data';
import { Bot, ArrowRight, CheckCircle2, AlertTriangle, Route } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';

const formSchema = z.object({
  currentLocation: z.string().min(2, { message: 'Please enter a valid location.' }),
  destination: z.string().min(2, { message: 'Please enter a valid destination.' }),
});

type SuggestionResult = {
  suggestedRoute: string;
  reason: string;
};

export default function AiSuggester() {
  const [result, setResult] = useState<SuggestionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentLocation: '',
      destination: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    setError(null);
    
    const availableRoutes = routes.map(r => r.name);
    const response = await getRouteSuggestion({ ...values, availableRoutes });

    if (response.success && response.data) {
      setResult(response.data);
    } else {
      setError(response.error || 'An unknown error occurred.');
    }
    setIsLoading(false);
  }

  return (
    <div className="space-y-6">
      <Card className="bg-transparent border-0 shadow-none md:bg-card md:border md:shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bot className="h-6 w-6 text-primary" />
            <CardTitle className="font-headline">AI Route Suggester</CardTitle>
          </div>
          <CardDescription>Let AI find the best route for you.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="currentLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Location</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Central Station" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="destination"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Destination</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Midtown Mall" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Thinking...' : 'Find Best Route'}
                {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {isLoading && (
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-3/4" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </CardContent>
        </Card>
      )}

      {error && (
        <Card className="border-destructive">
          <CardHeader className="flex-row gap-4 items-center">
            <AlertTriangle className="text-destructive h-6 w-6" />
            <CardTitle>Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error}</p>
          </CardContent>
        </Card>
      )}

      {result && (
        <Card className="border-accent">
          <CardHeader>
             <div className="flex items-center gap-3">
               <CheckCircle2 className="h-6 w-6 text-accent" />
               <CardTitle className="font-headline text-2xl">Best Route Found!</CardTitle>
             </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-accent/10 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Suggested Route</p>
                <div className="flex items-center gap-2">
                    <Route className="h-6 w-6 text-accent"/>
                    <p className="font-bold text-lg text-primary">{result.suggestedRoute}</p>
                </div>
            </div>
            
            <Separator />

            <div>
              <p className="text-sm text-muted-foreground mb-2">Reasoning</p>
              <p className="text-foreground leading-relaxed">{result.reason}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
