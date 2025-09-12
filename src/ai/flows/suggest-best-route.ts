'use server';

/**
 * @fileOverview Suggests the best route based on real-time bus locations, estimated arrival times, and bus capacity.
 *
 * - suggestBestRoute - A function that suggests the best route.
 * - SuggestBestRouteInput - The input type for the suggestBestRoute function.
 * - SuggestBestRouteOutput - The return type for the suggestBestRoute function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestBestRouteInputSchema = z.object({
  currentLocation: z
    .string()
    .describe('The current location of the passenger.'),
  destination: z.string().describe('The desired destination of the passenger.'),
  availableRoutes: z.array(z.string()).describe('A list of available routes.'),
});
export type SuggestBestRouteInput = z.infer<typeof SuggestBestRouteInputSchema>;

const SuggestBestRouteOutputSchema = z.object({
  suggestedRoute: z
    .string()
    .describe('The suggested best route based on the input data.'),
  reason: z
    .string()
    .describe('The reasoning behind the route suggestion.'),
});
export type SuggestBestRouteOutput = z.infer<typeof SuggestBestRouteOutputSchema>;

export async function suggestBestRoute(
  input: SuggestBestRouteInput
): Promise<SuggestBestRouteOutput> {
  return suggestBestRouteFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestBestRoutePrompt',
  input: {schema: SuggestBestRouteInputSchema},
  output: {schema: SuggestBestRouteOutputSchema},
  prompt: `You are an AI assistant designed to suggest the best route for a passenger using real-time bus locations, estimated arrival times, and bus capacity.

  Given the passenger's current location: {{{currentLocation}}},
  and their desired destination: {{{destination}}},
  and a list of available routes: {{{availableRoutes}}},

  Suggest the best route and explain your reasoning.
`,
});

const suggestBestRouteFlow = ai.defineFlow(
  {
    name: 'suggestBestRouteFlow',
    inputSchema: SuggestBestRouteInputSchema,
    outputSchema: SuggestBestRouteOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
