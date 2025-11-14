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
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
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
        <div className="flex items-center gap-2 md:gap-4">
          <ThemeToggle />
          <SignedIn>
            <div className="md:hidden">
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-9 w-9">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent className="p-0">
                  <SheetHeader className="px-6 pt-6 pb-4">
                    <SheetTitle>Menu</SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-1 px-4 pb-4">
                    <Link
                      href="/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-sm font-medium px-4 py-3 rounded-md hover:bg-accent transition-colors"
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/skills"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-sm font-medium px-4 py-3 rounded-md hover:bg-accent transition-colors"
                    >
                      Skills
                    </Link>
                    <Link
                      href="/projects"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-sm font-medium px-4 py-3 rounded-md hover:bg-accent transition-colors"
                    >
                      Projects
                    </Link>
                    <div className="flex items-center gap-3 pt-4 mt-4 border-t px-4">
                      <span className="text-sm text-muted-foreground">Account:</span>
                      <UserButton
                        appearance={{
                          elements: {
                            avatarBox: "h-9 w-9",
                          },
                        }}
                      />
                    </div>
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
                  <Button variant="ghost" size="icon" className="h-9 w-9">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent className="p-0">
                  <SheetHeader className="px-6 pt-6 pb-4">
                    <SheetTitle>Menu</SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-1 px-4 pb-4">
                    <Link
                      href="#features"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-sm font-medium px-4 py-3 rounded-md hover:bg-accent transition-colors"
                    >
                      Features
                    </Link>
                    <Link
                      href="#about"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-sm font-medium px-4 py-3 rounded-md hover:bg-accent transition-colors"
                    >
                      About
                    </Link>
                    <div className="flex flex-col gap-2 pt-4 mt-4 border-t px-4">
                      <Button variant="ghost" asChild className="justify-start">
                        <Link href="/sign-in" onClick={() => setMobileMenuOpen(false)}>
                          Sign In
                        </Link>
                      </Button>
                      <Button asChild className="justify-start">
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
