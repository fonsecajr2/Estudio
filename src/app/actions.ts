"use server";

import { suggestBestRoute, SuggestBestRouteInput } from '@/ai/flows/suggest-best-route';

export async function getRouteSuggestion(input: SuggestBestRouteInput) {
  try {
    const result = await suggestBestRoute(input);
    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to get suggestion. Please try again later.' };
  }
}
