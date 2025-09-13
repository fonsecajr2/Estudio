import { DashboardHeader } from '@/components/dashboard/header';
import FleetContainer from '@/components/dashboard/fleet-container';

export default function FleetPage() {
  return (
    <div className="flex flex-col flex-1">
      <DashboardHeader pageTitle="Live Fleet" />
      <main className="flex-1 p-4 sm:px-6 sm:py-0 md:gap-8">
        <FleetContainer />
      </main>
    </div>
  );
}
