"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Target,
  Eye,
  BookOpen,
  Users,
  Award,
  Heart,
  Lightbulb,
  TrendingUp,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";
import Footer from "@/components/common/footer";
import Navbar from "@/components/common/navbar";

export default function MissionVisionPage() {
  const missionPoints = [
    {
      icon: BookOpen,
      title: "Quality Islamic Education",
      description: "Deliver comprehensive Islamic studies with modern pedagogy",
    },
    {
      icon: Heart,
      title: "Character Development",
      description: "Nurture strong Islamic values and moral excellence",
    },
    {
      icon: Users,
      title: "Global Citizens",
      description: "Prepare students for success in a diverse world",
    },
    {
      icon: Lightbulb,
      title: "Research & Innovation",
      description: "Promote scholarly work and intellectual growth",
    },
  ];

  const visionPoints = [
    {
      icon: Award,
      title: "Center of Excellence",
      description: "Leading institution in Islamic education",
    },
    {
      icon: TrendingUp,
      title: "Academic Achievement",
      description: "Recognized for spiritual and academic success",
    },
    {
      icon: Users,
      title: "Future Leaders",
      description: "Producing scholars and community leaders",
    },
    {
      icon: Heart,
      title: "Interfaith Dialogue",
      description: "Fostering understanding and harmony",
    },
  ];

  const coreValues = [
    { name: "Faith", color: "bg-cyan-500" },
    { name: "Excellence", color: "bg-blue-500" },
    { name: "Integrity", color: "bg-purple-500" },
    { name: "Compassion", color: "bg-pink-500" },
    { name: "Knowledge", color: "bg-indigo-500" },
    { name: "Service", color: "bg-teal-500" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Navbar />
      {/* Hero Section */}
      <section className="relative h-[400px] bg-cyan-600 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>

        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-white text-center">
          <Link href="/about">
            <Button
              variant="ghost"
              className="absolute top-8 left-8 text-white hover:bg-white/20"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to About
            </Button>
          </Link>

          <Badge
            variant="secondary"
            className="mb-4 bg-white/20 backdrop-blur-sm text-white border-white/30"
          >
            <Target className="w-3 h-3 mr-1" />
            Our Purpose
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            Mission & Vision
          </h1>
          <p className="text-xl md:text-2xl text-cyan-50 max-w-3xl drop-shadow-md">
            Guiding Principles That Drive Our Commitment to Excellence
          </p>
        </div>
      </section>

      {/* Mission & Vision Cards */}
      <section className="container mx-auto px-4 -mt-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {/* Mission Card */}
          <Card className="border-none shadow-2xl bg-white overflow-hidden group hover:shadow-cyan-200/50 transition-all">
            <div className="relative h-64 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=400&fit=crop"
                alt="Our Mission"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/90 to-transparent"></div>
              <div className="absolute bottom-6 left-6">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-3">
                  <Target className="w-8 h-8 text-cyan-600" />
                </div>
                <h2 className="text-3xl font-bold text-white">Our Mission</h2>
              </div>
            </div>
            <CardContent className="p-8">
              <p className="text-lg text-slate-700 mb-6 leading-relaxed">
                To provide comprehensive Islamic education that combines
                traditional scholarship with modern pedagogy, fostering
                intellectual growth, spiritual development, and moral excellence
                in our students.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {missionPoints.map((point, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-cyan-50 transition-colors"
                  >
                    <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <point.icon className="w-5 h-5 text-cyan-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 text-sm mb-1">
                        {point.title}
                      </h4>
                      <p className="text-xs text-slate-600">
                        {point.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Vision Card */}
          <Card className="border-none shadow-2xl bg-white overflow-hidden group hover:shadow-purple-200/50 transition-all">
            <div className="relative h-64 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&h=400&fit=crop"
                alt="Our Vision"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 to-transparent"></div>
              <div className="absolute bottom-6 left-6">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-3">
                  <Eye className="w-8 h-8 text-purple-600" />
                </div>
                <h2 className="text-3xl font-bold text-white">Our Vision</h2>
              </div>
            </div>
            <CardContent className="p-8">
              <p className="text-lg text-slate-700 mb-6 leading-relaxed">
                To be a leading institution of Islamic education that produces
                well-rounded individuals who excel in both religious knowledge
                and worldly pursuits, contributing positively to society.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {visionPoints.map((point, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-purple-50 transition-colors"
                  >
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <point.icon className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 text-sm mb-1">
                        {point.title}
                      </h4>
                      <p className="text-xs text-slate-600">
                        {point.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-cyan-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">
              <CheckCircle2 className="w-3 h-3 mr-1" />
              Our Foundation
            </Badge>
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Core Values
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              The principles that shape our identity and guide our actions
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {coreValues.map((value, index) => (
                <Card
                  key={index}
                  className="border-none shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer group"
                >
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-16 h-16 ${value.color} rounded-2xl mx-auto mb-3 flex items-center justify-center group-hover:scale-110 transition-transform`}
                    >
                      <CheckCircle2 className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">
                      {value.name}
                    </h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="border-none shadow-2xl bg-gradient-to-br from-cyan-600 to-blue-700 overflow-hidden">
          <CardContent className="p-12 relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>

            <div className="relative text-center text-white max-w-3xl mx-auto">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <blockquote className="text-2xl md:text-3xl font-bold mb-4 leading-relaxed">
                "Seek knowledge from the cradle to the grave"
              </blockquote>
              <p className="text-cyan-100 text-lg">
                Our commitment to lifelong learning and spiritual growth
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 pb-20">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Ready to Join Our Community?
          </h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            Be part of an institution committed to excellence in Islamic
            education
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/about">
              <Button size="lg" variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to About
              </Button>
            </Link>
            <Button size="lg" className="bg-cyan-600 hover:bg-cyan-700">
              <Users className="w-4 h-4 mr-2" />
              Enroll Now
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
