"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { ThemeToggle } from "@/components/theme-toggle";
import { Menu, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">SkillPulse</span>
          </Link>
          <SignedIn>
            <div className="hidden md:flex gap-6">
              <Link href="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Dashboard
              </Link>
              <Link href="/skills" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Skills
              </Link>
              <Link href="/projects" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Projects
              </Link>
            </div>
          </SignedIn>
          <SignedOut>
            <div className="hidden md:flex gap-6">
              <Link href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Features
              </Link>
              <Link href="#about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
            </div>
          </SignedOut>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <SignedIn>
            <div className="md:hidden">
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Menu</SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-4 mt-6">
                    <Link
                      href="/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-sm font-medium"
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/skills"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-sm font-medium"
                    >
                      Skills
                    </Link>
                    <Link
                      href="/projects"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-sm font-medium"
                    >
                      Projects
                    </Link>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
            <div className="hidden md:block">
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "h-9 w-9",
                  },
                }}
              />
            </div>
          </SignedIn>
          <SignedOut>
            <div className="hidden md:flex gap-2">
              <Button variant="ghost" asChild>
                <Link href="/sign-in">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/sign-up">Get Started</Link>
              </Button>
            </div>
            <div className="md:hidden">
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Menu</SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-4 mt-6">
                    <Link
                      href="#features"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-sm font-medium"
                    >
                      Features
                    </Link>
                    <Link
                      href="#about"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-sm font-medium"
                    >
                      About
                    </Link>
                    <div className="flex flex-col gap-2 pt-4 border-t">
                      <Button variant="ghost" asChild>
                        <Link href="/sign-in" onClick={() => setMobileMenuOpen(false)}>
                          Sign In
                        </Link>
                      </Button>
                      <Button asChild>
                        <Link href="/sign-up" onClick={() => setMobileMenuOpen(false)}>
                          Get Started
                        </Link>
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
}
