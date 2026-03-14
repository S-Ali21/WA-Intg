"use client";

import { useState } from "react";
import Link from "next/link";
import { UserButton, Show, SignInButton, SignUpButton } from "@clerk/nextjs";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Button } from "@/components/ui/button";
import { MessageCircle, Menu, X, Github } from "lucide-react";

const navLinks = [
  { label: "Features", href: "/#features" },
  { label: "Pricing", href: "/pricing" },
  { label: "Open Source", href: "/open-source" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-4 left-0 right-0 z-50 w-full px-4 sm:px-6 pointer-events-none">
      <div className="max-w-7xl mx-auto glass rounded-full flex h-16 items-center justify-between px-6 shadow-2xl shadow-black/10 pointer-events-auto border-white/10">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 font-bold text-lg">
          <MessageCircle className="h-7 w-7 text-primary" />
          <span>WaChat</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://github.com/hetref/whatsapp-chat"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md inline-flex items-center gap-1.5"
          >
            <Github className="h-4 w-4" />
            GitHub
          </a>
        </nav>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeSwitcher />
          
          <Show when="signed-in">
            <div className="flex items-center gap-3">
              <Link href="/protected">
                <Button size="sm">Dashboard</Button>
              </Link>
              <UserButton />
            </div>
          </Show>

          <Show when="signed-out">
            <div className="flex items-center gap-2">
              <SignInButton mode="modal">
                <Button variant="ghost" size="sm">
                  Sign in
                </Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button size="sm">Get Started</Button>
              </SignUpButton>
            </div>
          </Show>
        </div>

        {/* Mobile actions */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeSwitcher />
          <button
            className="p-2 rounded-md hover:bg-accent"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t bg-background/95 backdrop-blur-xl px-4 py-3 space-y-1 mt-4 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-3 py-2.5 text-sm font-medium rounded-md hover:bg-accent transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://github.com/hetref/whatsapp-chat"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium rounded-md hover:bg-accent transition-colors"
            onClick={() => setMobileOpen(false)}
          >
            <Github className="h-4 w-4" />
            GitHub
          </a>
          <div className="pt-3 border-t mt-2 space-y-2">
            <Show when="signed-in">
              <Link href="/protected" className="block" onClick={() => setMobileOpen(false)}>
                <Button size="sm" className="w-full">
                  Dashboard
                </Button>
              </Link>
              <div className="flex justify-center py-2">
                 <UserButton />
              </div>
            </Show>

            <Show when="signed-out">
              <div className="flex flex-col gap-2">
                <SignInButton mode="modal">
                  <Button variant="outline" size="sm" className="w-full">
                    Sign in
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button size="sm" className="w-full">
                    Get Started
                  </Button>
                </SignUpButton>
              </div>
            </Show>
          </div>
        </div>
      )}
    </header>
  );
}
