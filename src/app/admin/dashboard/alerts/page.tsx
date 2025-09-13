import { DashboardHeader } from "@/components/dashboard/header";
import { AnomalyDetector } from "@/components/dashboard/anomaly-detector";
import { AlertsList } from "@/components/dashboard/alerts-list";

export default function AlertsPage() {
  return (
    <div className="flex flex-col flex-1">
      <DashboardHeader pageTitle="Alerts & AI Analysis" />
      <main className="flex-1 p-4 sm:px-6 sm:py-0 md:gap-8 grid lg:grid-cols-2 gap-6">
        <AnomalyDetector />
        <AlertsList />
      </main>
    </div>
  );
}
