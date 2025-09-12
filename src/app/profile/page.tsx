import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { ArrowLeft, BusFront } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function ProfilePage() {
  const userImage = PlaceHolderImages.find(p => p.id === 'user-avatar-1');

  return (
    <div className="flex min-h-dvh w-full flex-col bg-background">
      <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-card px-4 md:px-6">
        <div className="flex items-center gap-4">
          <Link href="/" aria-label="Back to home">
            <Button variant="outline" size="icon" className="h-9 w-9">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-semibold font-headline">Profile</h1>
        </div>
        <Link href="/" className="flex items-center gap-2">
            <BusFront className="h-7 w-7 text-primary" />
            <span className="text-xl font-bold font-headline text-foreground hidden sm:inline">TrackIt</span>
        </Link>
      </header>
      <main className="flex flex-1 items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="items-center text-center">
            <Avatar className="h-24 w-24 mb-4 border-2 border-primary">
              {userImage && <AvatarImage src={userImage.imageUrl} data-ai-hint={userImage.imageHint} alt="User avatar"/>}
              <AvatarFallback className="text-3xl">U</AvatarFallback>
            </Avatar>
            <CardTitle className="font-headline text-3xl">Your Name</CardTitle>
            <CardDescription>Manage your profile information.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="Your Name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="user@example.com" />
            </div>
            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-lg py-6">Save Changes</Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
