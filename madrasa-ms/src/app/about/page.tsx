"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  BookOpen,
  Users,
  Award,
  GraduationCap,
  Trophy,
  Target,
  Heart,
  Globe,
  Mail,
  Phone,
  Calendar,
  ArrowRight,
  ArrowLeft,
  LucideIcon,
} from "lucide-react";
import Footer from "@/components/common/footer";
import Navbar from "@/components/common/navbar";
import * as Icons from "lucide-react";

// Interfaces
interface AboutSection {
  id: string;
  title: string;
  subtitle: string;
  establishedYear: number;
  storyTitle: string;
  storyContent: string;
  storyImageUrl: string;
  heroImageUrl: string | null;
}

interface AboutStat {
  id: string;
  label: string;
  value: string;
  icon: string;
  color: string;
  order: number;
}

interface AboutValue {
  id: string;
  title: string;
  description: string;
  icon: string;
  order: number;
}

interface AboutFAQ {
  id: string;
  question: string;
  answer: string;
  order: number;
}

export default function AboutPage() {
  const [aboutSection, setAboutSection] = useState<AboutSection | null>(null);
  const [stats, setStats] = useState<AboutStat[]>([]);
  const [values, setValues] = useState<AboutValue[]>([]);
  const [faqs, setFaqs] = useState<AboutFAQ[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const [sectionRes, statsRes, valuesRes, faqsRes] = await Promise.all([
        fetch("/api/about-section"),
        fetch("/api/about-stats"),
        fetch("/api/about-values"),
        fetch("/api/about-faqs"),
      ]);

      if (sectionRes.ok) {
        const sectionData = await sectionRes.json();
        setAboutSection(sectionData);
      }

      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      }

      if (valuesRes.ok) {
        const valuesData = await valuesRes.json();
        setValues(valuesData);
      }

      if (faqsRes.ok) {
        const faqsData = await faqsRes.json();
        setFaqs(faqsData);
      }
    } catch (error) {
      console.error("Error fetching about page data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to get icon component from string
  const getIconComponent = (iconName: string): LucideIcon => {
    const IconComponent = (Icons as any)[iconName];
    return IconComponent || Icons.Heart;
  };

  // Default data for fallback
  const defaultSection = {
    title: "About Our Madrasa",
    subtitle: "Nurturing Islamic Knowledge & Excellence Since 1999",
    establishedYear: 1999,
    storyTitle: "Building a Legacy of Islamic Education",
    storyContent:
      "Founded in 1999, Madrasa MX has been at the forefront of providing quality Islamic education combined with modern academic excellence.",
    storyImageUrl:
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=600&fit=crop",
  };

  const quickLinks = [
    {
      title: "Our Mission & Vision",
      description: "Learn about our goals and aspirations",
      icon: Target,
      href: "/about/mission-vission",
      color: "from-cyan-500 to-blue-600",
    },
    {
      title: "Our Teachers",
      description: "Meet our distinguished faculty members",
      icon: GraduationCap,
      href: "/about/teachers",
      color: "from-blue-500 to-purple-600",
    },
    {
      title: "Management Committee",
      description: "Our dedicated leadership team",
      icon: Users,
      href: "/about/committee",
      color: "from-purple-500 to-pink-600",
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-cyan-600 mb-4"></div>
            <p className="text-xl text-slate-600">Loading about page...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const displaySection = aboutSection || defaultSection;
  const displayStats = stats.length > 0 ? stats : [];
  const displayValues = values.length > 0 ? values : [];
  const displayFaqs = faqs.length > 0 ? faqs : [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Navbar />
      {/* Hero Section */}
      <section className="relative h-[400px] bg-cyan-600 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>

        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-white text-center">
          <Badge
            variant="secondary"
            className="mb-4 bg-white/20 backdrop-blur-sm text-white border-white/30"
          >
            <BookOpen className="w-3 h-3 mr-1" />
            About Madrasa MX
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            {displaySection.title}
          </h1>
          <p className="text-xl md:text-2xl text-cyan-50 max-w-3xl drop-shadow-md">
            {displaySection.subtitle}
          </p>
          <div className="mt-6 flex gap-4">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-cyan-600 hover:bg-cyan-50"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Schedule a Visit
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/20"
            >
              <Phone className="w-4 h-4 mr-2" />
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="container mx-auto px-4 -mt-20 relative z-10">
        {displayStats.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {displayStats.map((stat, index) => {
              const StatIcon = getIconComponent(stat.icon);
              return (
                <Card
                  key={stat.id}
                  className="border-none shadow-xl bg-white hover:shadow-2xl transition-shadow"
                >
                  <CardContent className="p-6 text-center">
                    <StatIcon className={`w-12 h-12 mx-auto mb-3 ${stat.color}`} />
                    <h3 className="text-3xl font-bold text-slate-900 mb-1">
                      {stat.value}
                    </h3>
                    <p className="text-slate-600">{stat.label}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </section>

      {/* Our Story Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src={displaySection.storyImageUrl}
              alt="Madrasa Building"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <Badge className="mb-2 bg-cyan-500">
                Established {displaySection.establishedYear}
              </Badge>
              <h3 className="text-2xl font-bold">
                {new Date().getFullYear() - displaySection.establishedYear}+ Years of Excellence
              </h3>
            </div>
          </div>

          <div>
            <Badge variant="outline" className="mb-4">
              <BookOpen className="w-3 h-3 mr-1" />
              Our Story
            </Badge>
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              {displaySection.storyTitle}
            </h2>
            <p className="text-lg text-slate-600 mb-4 whitespace-pre-wrap">
              {displaySection.storyContent}
            </p>
            <div className="space-y-3">
              {[
                "Accredited Islamic curriculum",
                "Modern teaching methodologies",
                "State-of-the-art facilities",
                "Qualified and experienced teachers",
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-cyan-600 rounded-full"></div>
                  <p className="text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-cyan-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">
              <ArrowRight className="w-3 h-3 mr-1" />
              Explore More
            </Badge>
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Learn More About Us
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Discover more about our mission, faculty, and leadership
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {quickLinks.map((link, index) => (
              <Link key={index} href={link.href}>
                <Card className="border-none shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 h-full cursor-pointer group">
                  <CardContent className="p-6">
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${link.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <link.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-cyan-600 transition-colors">
                      {link.title}
                    </h3>
                    <p className="text-slate-600 mb-4">{link.description}</p>
                    <div className="flex items-center text-cyan-600 font-semibold group-hover:gap-2 transition-all">
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            <Heart className="w-3 h-3 mr-1" />
            What We Stand For
          </Badge>
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Our Core Values
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            The fundamental principles that guide everything we do
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {displayValues.map((value, index) => {
            const ValueIcon = getIconComponent(value.icon);
            return (
              <Card
                key={value.id}
                className="border-none shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 bg-gradient-to-br from-white to-slate-50"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <ValueIcon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-slate-600">{value.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-cyan-900 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4 bg-white/10 text-white">
              Common Questions
            </Badge>
            <h2 className="text-4xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Find answers to common questions about our madrasa
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {displayFaqs.length > 0 ? (
              <Accordion type="single" collapsible className="space-y-4">
                {displayFaqs.map((faq, index) => (
                  <AccordionItem
                    key={faq.id}
                    value={`item-${index + 1}`}
                    className="bg-white/10 backdrop-blur-sm border-white/20 rounded-lg px-6"
                  >
                    <AccordionTrigger className="text-white hover:text-cyan-200">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-300 whitespace-pre-wrap">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <div className="text-center text-white/70 py-8">
                <p>No FAQs available at the moment.</p>
              </div>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
