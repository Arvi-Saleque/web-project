"use client";

import * as React from "react";
import Link from "next/link";
import {
  Menu,
  Search,
  X,
  ChevronDown,
  BookOpen,
  Home,
  Info,
  GraduationCap,
  Newspaper,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

// Navigation menu items with dropdown structure
const navigationItems = [
  {
    title: "Home",
    href: "/",
    icon: Home,
  },
  {
    title: "About Us",
    icon: Info,
    items: [
      { title: "About", href: "/about" },
      { title: "Mission & Vision", href: "/about/mission-vission" },
      { title: "Teachers Panel", href: "/about/teachers" },
      { title: "Committee", href: "/about/committee" },
    ],
  },
  {
    title: "Academic",
    icon: GraduationCap,
    items: [
      { title: "Daily Assignments", href: "/academic/assignments" },
      { title: "Exam Routing", href: "/academic/exams" },
      { title: "Class Routine", href: "/academic/routine" },
      { title: "Exam Results", href: "/academic/results" },
      { title: "Academic Calendar", href: "/academic/calendar" },
    ],
  },
  {
    title: "News & Events",
    href: "/news-events",
    icon: Newspaper,
  },
  {
    title: "Contact Us",
    href: "/contact",
    icon: Phone,
  },
];

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Implement search functionality
      console.log("Searching for:", searchQuery);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Section */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <BookOpen className="h-6 w-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold leading-tight">Madrasa</span>
              <span className="text-xs text-muted-foreground">Management</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden items-center space-x-1 md:flex">
            {navigationItems.map((item, index) => (
              <React.Fragment key={index}>
                {item.items ? (
                  // Dropdown Menu for items with sub-items
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="gap-1">
                        {item.icon && <item.icon className="h-4 w-4" />}
                        {item.title}
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-56">
                      {item.items.map((subItem, subIndex) => (
                        <DropdownMenuItem key={subIndex} asChild>
                          <Link href={subItem.href} className="cursor-pointer">
                            {subItem.title}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  // Regular link for items without sub-items
                  <Button variant="ghost" asChild>
                    <Link href={item.href!} className="gap-2">
                      {item.icon && <item.icon className="h-4 w-4" />}
                      {item.title}
                    </Link>
                  </Button>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Search and Mobile Menu */}
          <div className="flex items-center gap-2">
            {/* Search Field - Desktop */}
            <div className="hidden md:block">
              {isSearchOpen ? (
                <form
                  onSubmit={handleSearch}
                  className="flex items-center gap-2"
                >
                  <Input
                    type="search"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64 transition-all"
                    autoFocus
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsSearchOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </form>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSearchOpen(true)}
                >
                  <Search className="h-5 w-5" />
                </Button>
              )}
            </div>

            {/* Mobile Search Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="mt-6 flex flex-col space-y-3">
                  {navigationItems.map((item, index) => (
                    <div key={index}>
                      {item.items ? (
                        // Dropdown for mobile
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              className="w-full justify-start gap-2"
                            >
                              {item.icon && <item.icon className="h-4 w-4" />}
                              {item.title}
                              <ChevronDown className="ml-auto h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="start" className="w-full">
                            {item.items.map((subItem, subIndex) => (
                              <DropdownMenuItem key={subIndex} asChild>
                                <Link
                                  href={subItem.href}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="cursor-pointer"
                                >
                                  {subItem.title}
                                </Link>
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      ) : (
                        // Regular link for mobile
                        <Button
                          variant="ghost"
                          asChild
                          className="w-full justify-start gap-2"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <Link href={item.href!}>
                            {item.icon && <item.icon className="h-4 w-4" />}
                            {item.title}
                          </Link>
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="border-t py-3 md:hidden">
            <form onSubmit={handleSearch} className="flex items-center gap-2">
              <Input
                type="search"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
                autoFocus
              />
              <Button type="submit" size="sm">
                Search
              </Button>
            </form>
          </div>
        )}
      </div>
    </nav>
  );
}
