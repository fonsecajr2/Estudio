import Link from 'next/link';
import { Home, MapPinned, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function BottomNav() {
  // A simple implementation. A more advanced one might use usePathname to highlight the active link.
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t shadow-[0_-1px_4px_rgba(0,0,0,0.05)]">
      <div className="flex justify-around items-center h-16">
        <Link href="/" className="flex flex-col items-center gap-1 text-primary">
          <Home className="h-6 w-6" />
          <span className="text-xs font-medium">Home</span>
        </Link>
        <Link href="/#routes" className="flex flex-col items-center gap-1 text-muted-foreground">
          <MapPinned className="h-6 w-6" />
          <span className="text-xs font-medium">Routes</span>
        </Link>
        <Link href="/profile" className="flex flex-col items-center gap-1 text-muted-foreground">
          <User className="h-6 w-6" />
          <span className="text-xs font-medium">Profile</span>
        </Link>
      </div>
    </nav>
  );
}
