import Link from 'next/link';
import {
  Search,
  PanelLeft,
  Bell,
  Home,
  ChevronRight,
  Users,
  Route,
  Siren,
  Map,
  Bus,
} from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import Image from 'next/image';

type DashboardHeaderProps = {
    pageTitle: string;
};

export function DashboardHeader({ pageTitle }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
            <nav className="grid gap-6 text-lg font-medium">
                <Link
                href="#"
                className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                >
                <Bus className="h-5 w-5 transition-all group-hover:scale-110" />
                <span className="sr-only">SmartCommute</span>
                </Link>
                <Link
                href="/dashboard"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                <Home className="h-5 w-5" />
                Dashboard
                </Link>
                <Link
                href="/dashboard/fleet"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                <Map className="h-5 w-5" />
                Live Fleet
                </Link>
                <Link
                href="/dashboard/routes"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                <Route className="h-5 w-5" />
                Routes
                </Link>
                <Link
                href="/dashboard/drivers"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                <Users className="h-5 w-5" />
                Drivers
                </Link>
                 <Link
                href="/dashboard/alerts"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                <Siren className="h-5 w-5" />
                Alerts
                </Link>
            </nav>
        </SheetContent>
      </Sheet>
      <Breadcrumb className="hidden md:flex">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard">
                <Home className='h-4 w-4'/>
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <ChevronRight className='h-4 w-4'/>
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage className='font-semibold'>{pageTitle}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="relative ml-auto flex-1 md:grow-0">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
        />
      </div>
      <Button variant="outline" size="icon" className="h-9 w-9">
          <Bell className="h-4 w-4" />
          <span className="sr-only">Toggle notifications</span>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="overflow-hidden rounded-full h-9 w-9"
          >
            <Image
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              width={36}
              height={36}
              alt="Avatar"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
