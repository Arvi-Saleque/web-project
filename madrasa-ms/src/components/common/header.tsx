"use client";

import * as React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import LinkCardButton from "@/components/common/link-card-button";
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Users,
  GraduationCap,
  PencilIcon,
  UserXIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Slider interface
interface Slide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  description: string;
  primaryButton: string;
  secondaryButton: string;
}

// Default slides - used as fallback if API fails
const defaultSlides: Slide[] = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=2070",
    title: "Welcome to Our Madrasa",
    subtitle: "Building Knowledge, Nurturing Faith",
    description: "Excellence in Islamic education with modern teaching methods",
    primaryButton: "Enroll Now",
    secondaryButton: "Learn More",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022",
    title: "Quality Islamic Education",
    subtitle: "Empowering Future Scholars",
    description:
      "Comprehensive curriculum combining traditional and contemporary learning",
    primaryButton: "View Programs",
    secondaryButton: "Contact Us",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2032",
    title: "Join Our Community",
    subtitle: "Where Learning Meets Purpose",
    description:
      "Experienced teachers dedicated to your child's spiritual and academic growth",
    primaryButton: "Get Started",
    secondaryButton: "Our Faculty",
  },
];

// Features to display
const features = [
  {
    href: "/about",
    icon: BookOpen,
    title: "Today's Homework",
    description: "View assigned homework for today",
  },
  {
    href: "/about/teachers",
    icon: PencilIcon,
    title: "Next exam",
    description: "Check the schedule for the upcoming exam",
  },
  {
    href: "/academic",
    icon: UserXIcon,
    title: "Today's absence",
    description: "See the list of absent students today",
  },
];

export default function Header() {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = React.useState(true);
  const [slides, setSlides] = React.useState<Slide[]>(defaultSlides);
  const [isLoading, setIsLoading] = React.useState(true);

  // Fetch slides from API
  React.useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await fetch("/api/header-slides");
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            setSlides(data);
          }
        }
      } catch (error) {
        console.error("Error fetching slides:", error);
        // Keep default slides on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchSlides();
  }, []);

  // Auto-play functionality
  React.useEffect(() => {
    if (!isAutoPlaying || isLoading) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length, isLoading]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <header className="relative">
      {/* Hero Slider Section */}
      <div className="relative h-screen w-full overflow-hidden">
        {/* Slides */}
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={cn(
              "absolute inset-0 transition-all duration-1000 ease-in-out",
              currentSlide === index
                ? "opacity-100 translate-x-0"
                : index < currentSlide
                ? "opacity-0 -translate-x-full"
                : "opacity-0 translate-x-full"
            )}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                priority={index === 0}
                quality={90}
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex h-full items-center">
              <div className="container mx-auto px-4">
                <div className="max-w-3xl space-y-6 animate-fade-in">
                  {/* Subtitle Badge */}
                  <div className="inline-flex items-center gap-2 rounded-full bg-primary/20 px-4 py-2 backdrop-blur-sm border border-primary/30">
                    <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-sm font-medium text-white">
                      {slide.subtitle}
                    </span>
                  </div>

                  {/* Main Title */}
                  <h1 className="text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
                    {slide.title}
                  </h1>

                  {/* Description */}
                  <p className="text-lg text-gray-200 md:text-xl lg:text-2xl">
                    {slide.description}
                  </p>

                  {/* Buttons */}
                  <div className="flex flex-wrap gap-4 pt-4">
                    <Button
                      size="lg"
                      className="h-12 px-8 text-base font-semibold shadow-lg hover:shadow-xl transition-all"
                    >
                      {slide.primaryButton}
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="h-12 px-8 text-base font-semibold bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 hover:text-white shadow-lg"
                    >
                      {slide.secondaryButton}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-3 backdrop-blur-sm border border-white/20 text-white transition-all hover:bg-white/20 hover:scale-110"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-3 backdrop-blur-sm border border-white/20 text-white transition-all hover:bg-white/20 hover:scale-110"
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Dots Navigation */}
        <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                currentSlide === index
                  ? "w-12 bg-white"
                  : "w-2 bg-white/50 hover:bg-white/75"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-24 left-1/2 z-20 -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center gap-2 text-white/80">
            <span className="text-xs font-medium">Scroll Down</span>
            <ChevronRight className="h-4 w-4 rotate-90" />
          </div>
        </div>
      </div>

      {/* Features Section (Below Slider) */}
      <div className="relative -mt-20 z-30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {features.map((feature, index) => (
              <LinkCardButton
                key={index}
                href={feature.href}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
