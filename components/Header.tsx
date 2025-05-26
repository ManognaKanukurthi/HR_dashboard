"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X, Users, BookmarkIcon, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';

export function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Handle scroll events to change header appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const navItems = [
    { 
      label: 'Dashboard', 
      href: '/', 
      icon: <Users className="h-4 w-4 mr-1" />
    },
    { 
      label: 'Bookmarks', 
      href: '/bookmarks', 
      icon: <BookmarkIcon className="h-4 w-4 mr-1" /> 
    },
    { 
      label: 'Analytics', 
      href: '/analytics', 
      icon: <BarChart3 className="h-4 w-4 mr-1" /> 
    }
  ];
  
  return (
    <header className={`sticky top-0 z-50 transition-all duration-200 ${
      isScrolled 
        ? 'bg-background/90 backdrop-blur-md border-b shadow-sm' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Users className="h-6 w-6 text-primary mr-2" />
              <span className="text-lg font-semibold">HR Dashboard</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Button
                key={item.href}
                variant={pathname === item.href ? "default" : "ghost"}
                size="sm"
                asChild
              >
                <Link href={item.href} className="flex items-center">
                  {item.icon}
                  {item.label}
                </Link>
              </Button>
            ))}
            <div className="ml-2">
              <ThemeToggle />
            </div>
          </nav>
          
          {/* Mobile Navigation Button */}
          <div className="flex items-center md:hidden space-x-2">
            <ThemeToggle />
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border">
          <div className="container mx-auto px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <Button
                key={item.href}
                variant={pathname === item.href ? "default" : "ghost"}
                size="sm"
                className="w-full justify-start"
                onClick={() => setIsMenuOpen(false)}
                asChild
              >
                <Link href={item.href} className="flex items-center">
                  {item.icon}
                  {item.label}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}