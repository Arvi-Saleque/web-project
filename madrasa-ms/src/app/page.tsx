"use client";

import { useEffect, useState } from "react";
import Header from "@/components/common/header";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  BookOpen,
  Users,
  Calendar,
  Trophy,
  GraduationCap,
  Clock,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  CheckCircle,
  Newspaper,
  Target,
  Heart,
  Star,
  Award,
  Shield,
  Zap,
  Globe,
} from "lucide-react";
import Navbar from "@/components/common/navbar";
import Footer from "@/components/common/footer";

// Icon mapping for dynamic rendering
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  GraduationCap,
  BookOpen,
  Trophy,
  Target,
  Heart,
  Star,
  Users,
  Award,
  Shield,
  Zap,
  Clock,
  Globe,
};

interface Stat {
  id: string;
  label: string;
  value: string;
  order: number;
}

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
  iconColor: string;
  order: number;
}

export default function Home() {
  const [stats, setStats] = useState<Stat[]>([]);
  const [features, setFeatures] = useState<Feature[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchHomePageData();
  }, []);

  const fetchHomePageData = async () => {
    try {
      const [statsRes, featuresRes] = await Promise.all([
        fetch("/api/homepage/stats"),
        fetch("/api/homepage/features"),
      ]);

      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      }

      if (featuresRes.ok) {
        const featuresData = await featuresRes.json();
        setFeatures(featuresData);
      }
    } catch (error) {
      console.error("Error fetching homepage data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getIconColorClasses = (color: string) => {
    const colorMap: Record<string, string> = {
      cyan: "bg-cyan-100 text-cyan-600",
      blue: "bg-blue-100 text-blue-600",
      purple: "bg-purple-100 text-purple-600",
      amber: "bg-amber-100 text-amber-600",
      rose: "bg-rose-100 text-rose-600",
      green: "bg-green-100 text-green-600",
    };
    return colorMap[color] || "bg-cyan-100 text-cyan-600";
  };
  return (
    <div>
      <Navbar />
      <Header />
      {/* Services Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold text-slate-900">About US</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Comprehensive educational services designed to nurture minds and
            hearts
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="border-none shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
            <CardHeader>
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <BookOpen className="w-7 h-7 text-blue-600" />
              </div>
              <CardTitle className="text-2xl">Academic Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-4">
                Manage assignments, exams, class routines, and results
                efficiently with our comprehensive system.
              </p>
              <Link href="/academic/assignments">
                <Button variant="link" className="text-cyan-600 p-0 h-auto">
                  Learn More <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
            <CardHeader>
              <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Users className="w-7 h-7 text-purple-600" />
              </div>
              <CardTitle className="text-2xl">Teacher Portal</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-4">
                Dedicated portal for teachers to manage classes and track
                student progress effectively.
              </p>
              <Link href="/about/teachers">
                <Button variant="link" className="text-cyan-600 p-0 h-auto">
                  View Faculty <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
            <CardHeader>
              <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                <Newspaper className="w-7 h-7 text-amber-600" />
              </div>
              <CardTitle className="text-2xl">News & Events</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-4">
                Stay updated with latest news, announcements, and upcoming
                events from our institution.
              </p>
              <Link href="/news-events">
                <Button variant="link" className="text-cyan-600 p-0 h-auto">
                  See Updates <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-cyan-600 py-16">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="text-center text-white">
              <p className="text-xl">Loading statistics...</p>
            </div>
          ) : stats.length > 0 ? (
            <div
              className={`grid grid-cols-2 md:grid-cols-${Math.min(
                stats.length,
                4
              )} gap-8 text-center text-white`}
            >
              {stats.map((stat) => (
                <div key={stat.id}>
                  <div className="text-5xl font-bold mb-2">{stat.value}</div>
                  <p className="text-cyan-100 text-lg">{stat.label}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-white">
              <p className="text-xl">No statistics available</p>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center space-y-4 mb-16">
          <Badge className="bg-purple-100 text-purple-700 border-purple-300">
            Why Choose Us
          </Badge>
          <h2 className="text-4xl font-bold text-slate-900">
            Excellence in Education
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Committed to providing quality education with strong moral values
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-xl text-slate-600">Loading features...</p>
          </div>
        ) : features.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => {
              const IconComponent = iconMap[feature.icon] || GraduationCap;
              return (
                <Card
                  key={feature.id}
                  className="border-2 border-slate-200 hover:border-cyan-300 transition-colors"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-12 h-12 ${getIconColorClasses(
                          feature.iconColor
                        )} rounded-full flex items-center justify-center flex-shrink-0`}
                      >
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-slate-600">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-slate-600">No features available</p>
          </div>
        )}
      </section>

      {/* Quick Links Section */}
      <section className="bg-slate-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <Badge className="bg-slate-200 text-slate-700 border-slate-300">
              Quick Access
            </Badge>
            <h2 className="text-4xl font-bold text-slate-900">
              Important Links
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/academic/routine">
              <Card className="border-none shadow-md hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer bg-gradient-to-br from-blue-50 to-cyan-50">
                <CardContent className="p-6 text-center">
                  <Clock className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-slate-900 mb-1">
                    Class Routine
                  </h3>
                  <p className="text-sm text-slate-600">View schedules</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/academic/exams">
              <Card className="border-none shadow-md hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer bg-gradient-to-br from-purple-50 to-pink-50">
                <CardContent className="p-6 text-center">
                  <BookOpen className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-slate-900 mb-1">
                    Exam Routine
                  </h3>
                  <p className="text-sm text-slate-600">Check dates</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/academic/calendar">
              <Card className="border-none shadow-md hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer bg-gradient-to-br from-amber-50 to-orange-50">
                <CardContent className="p-6 text-center">
                  <Calendar className="w-12 h-12 text-amber-600 mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-slate-900 mb-1">
                    News & Events
                  </h3>
                  <p className="text-sm text-slate-600">Important news</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/contact">
              <Card className="border-none shadow-md hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer bg-gradient-to-br from-rose-50 to-red-50">
                <CardContent className="p-6 text-center">
                  <Phone className="w-12 h-12 text-rose-600 mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-slate-900 mb-1">
                    Contact Us
                  </h3>
                  <p className="text-sm text-slate-600">Get in touch</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 pb-20 mt-20">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Join Our Growing Community
          </h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            Take the first step towards a comprehensive Islamic education.
            Enroll today and become part of our legacy.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-cyan-600 hover:bg-cyan-700">
              <Users className="w-4 h-4 mr-2" />
              Enroll Now
            </Button>
            <Button size="lg" className="bg-cyan-600 hover:bg-cyan-700">
              <Users className="w-4 h-4 mr-2" />
              Contact Admissions
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
