import Header from '@/components/layout/header';
import BottomNav from '@/components/layout/bottom-nav';
import ControlPanel from '@/components/tracking/control-panel';
import MapView from '@/components/map/map-view';

export default function Home() {
  return (
    <div className="flex flex-col h-dvh bg-background font-body">
      <Header />
      <main className="flex flex-1 flex-col md:flex-row overflow-hidden">
        <div className="w-full md:w-[350px] lg:w-[400px] h-2/5 md:h-full overflow-y-auto p-4 border-t md:border-t-0 md:border-r bg-card md:bg-transparent">
          <ControlPanel />
        </div>
        <div className="flex-1 h-3/5 md:h-full">
          <MapView />
        </div>
      </main>
      <BottomNav />
      {/* Spacer for bottom nav */}
      <div className="md:hidden h-16"></div>
    </div>
  );
}
