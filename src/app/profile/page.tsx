"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ArrowLeft, Bus, BusFront, Loader2 } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  driverId: z.string().min(1, { message: "Driver ID is required." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

export default function ProfilePage() {
  const [isLoading, setIsLoading] = React.useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      driverId: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    console.log("Simulating login with:", values);

    await new Promise(resolve => setTimeout(resolve, 1500));

    if (values.driverId === "driver123" && values.password === "password123") {
      toast({
        title: "Login Successful",
        description: "Redirecting to your dashboard...",
      });
      // Exemplo de redirecionamento real:
      
      router.push("/driverdash");
    } else {
      form.setError("root", { message: "Invalid credentials. Please try again." });
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "Invalid credentials provided.",
      });
    }

    setIsLoading(false);
  }

  return (
    <div className="flex min-h-dvh w-full flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-card px-4 md:px-6">
        <div className="flex items-center gap-4">
          <Link href="/" aria-label="Back to home">
            <Button variant="outline" size="icon" className="h-9 w-9">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-semibold font-headline">Driver Login</h1>
        </div>
        <Link href="/" className="flex items-center gap-2">
          <BusFront className="h-7 w-7 text-primary" />
          <span className="text-xl font-bold font-headline text-foreground hidden sm:inline">
            TrackIt
          </span>
        </Link>
      </header>

      {/* Main */}
      <main className="flex flex-1 items-center justify-center p-4">
        <Card className="w-full max-w-sm shadow-2xl">
          <CardHeader className="text-center">
            <div className="mx-auto bg-primary/10 p-3 rounded-full mb-4 w-fit">
              <Bus className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl font-headline">TrackIt</CardTitle>
            <CardDescription>Track your ride. Anytime. Anywhere</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="driverId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Driver ID</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., DRV-12345" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {form.formState.errors.root && (
                  <FormMessage>{form.formState.errors.root.message}</FormMessage>
                )}
                <Button type="submit" className="w-full mt-2" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isLoading ? "Signing In..." : "Sign In"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
