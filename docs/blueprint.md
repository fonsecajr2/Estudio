# **App Name**: TrackIt

## Core Features:

- Real-time Bus Tracking: Display real-time bus locations on an interactive map using data fetched via WebSocket with the mapbox token pk.eyJ1IjoiZXdlcnRvbjA4IiwiYSI6ImNtZmdyMHh6czAzZnIyanF2b2ZwM2pmOXAifQ.vdj0Ef7YgzPXQpQJJ1OUog.
- Route Selection: Allow users to select a route from a list of available routes (fetched via GET /routes).
- Stop List Display: Display a list of stops for a selected route (fetched via GET /stops/:routeId).
- Bus ETA Calculation: Provide an estimated time of arrival (ETA) for the selected bus (fetched via GET /eta).
- Occupancy Level Indicator: Display the current occupancy level of the bus using a percentage bar.
- AI-Powered Route Suggestion: Use a tool to suggest the best route based on current bus locations and estimated arrival times, and display bus capacity to improve travel.
- User profile access: Button to access the user's profile page.

## Style Guidelines:

- Primary color: Deep sky blue (#38B6FF) to reflect trust and reliability.
- Background color: Light gray (#F0F0F0) for a clean, modern interface.
- Accent color: Emerald green (#50C878) to provide contrast for interactive elements.
- Body and headline font: 'PT Sans' (sans-serif) for a clean, modern look.
- Use simple, intuitive icons throughout the application.
- Employ a clean, straightforward layout optimized for responsiveness on various devices.