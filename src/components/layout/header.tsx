import Link from 'next/link';
import { User, BusFront } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Header() {
  const userImage = PlaceHolderImages.find(p => p.id === 'user-avatar-1');
  return (
    <header className="flex items-center justify-between p-3 md:p-4 border-b bg-card shadow-sm sticky top-0 z-20">
      <Link href="/" className="flex items-center gap-2" aria-label="TrackIt Home">
        <BusFront className="h-8 w-8 text-primary" />
        <h1 className="text-2xl font-bold font-headline text-foreground">TrackIt</h1>
      </Link>
      <div className="flex items-center gap-4">
        <Link href="/profile" aria-label="View Profile">
          <Button variant="ghost" className="relative h-9 w-9 rounded-full">
            <Avatar className="h-9 w-9">
              {userImage && <AvatarImage src={userImage.imageUrl} data-ai-hint={userImage.imageHint} alt="User Avatar" />}
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </Button>
        </Link>
      </div>
    </header>
  );
}
