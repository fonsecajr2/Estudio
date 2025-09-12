# TrackIt - Punjab Bus Tracking

TrackIt is a Next.js app for real-time bus tracking and route information in Punjab.

## Features

- Real-time bus locations on an interactive Mapbox map
- Route selection and stop list display
- Estimated time of arrival (ETA) for buses
- Occupancy level indicator (percentage bar)
- AI-powered route suggestion ([src/ai/flows/suggest-best-route.ts](src/ai/flows/suggest-best-route.ts))
- User profile access
- Responsive, modern UI using Tailwind CSS and Radix UI components

## Style Guidelines

- Primary color: Deep sky blue (#38B6FF)
- Accent color: Emerald green (#50C878)
- Background: Light gray (#F0F0F0)
- Font: 'PT Sans' (Google Fonts)

## Getting Started

1. **Install dependencies:**
   ```sh
   npm install
   ```

2. **Run the development server:**
   ```sh
   npm run dev
   ```

   The app will be available at [http://localhost:3000](http://localhost:3000).

3. **Explore the main page:**
   See [src/app/page.tsx](src/app/page.tsx).

## Project Structure

- `src/app/` — App entry, layout, global styles
- `src/components/ui/` — UI components (sidebar, sheet, badge, etc.)
- `src/ai/` — AI flows and route suggestion logic
- `src/hooks/` — Custom React hooks
- `src/lib/` — Utilities and data helpers
- `docs/blueprint.md` — Feature and style blueprint

## Customization

- Edit colors, fonts, and layout in [src/app/globals.css](src/app/globals.css) and [tailwind.config.ts](tailwind.config.ts).
- Add or modify routes and AI logic in [src/ai/flows/](src/ai/flows/).

## License

MIT