import { DashboardHeader } from "@/components/dashboard/header";
import { DriverTable } from "@/components/dashboard/driver-table";

export default function DriversPage() {
  return (
    <div className="flex flex-col flex-1">
      <DashboardHeader pageTitle="Drivers" />
      <main className="flex-1 p-4 sm:px-6 sm:py-0 md:gap-8">
        <DriverTable />
      </main>
    </div>
  );
}
