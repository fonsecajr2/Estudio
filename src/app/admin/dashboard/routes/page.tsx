import { DashboardHeader } from "@/components/dashboard/header";
import { RouteTable } from "@/components/dashboard/route-table";

export default function RoutesPage() {
  return (
    <div className="flex flex-col flex-1">
      <DashboardHeader pageTitle="Routes" />
      <main className="flex-1 p-4 sm:px-6 sm:py-0 md:gap-8">
        <RouteTable />
      </main>
    </div>
  );
}
