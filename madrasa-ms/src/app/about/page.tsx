"use client";

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
} from "lucide-react";

export default function AboutPage() {
  const stats = [
    { icon: Users, value: "2000+", label: "Students", color: "text-cyan-600" },
    {
      icon: GraduationCap,
      value: "150+",
      label: "Teachers",
      color: "text-blue-600",
    },
    {
      icon: Award,
      value: "25+",
      label: "Years Experience",
      color: "text-purple-600",
    },
    {
      icon: Trophy,
      value: "50+",
      label: "Awards Won",
      color: "text-amber-600",
    },
  ];

  const values = [
    {
      icon: Heart,
      title: "Faith & Character",
      description:
        "Building strong Islamic character and values in every student",
    },
    {
      icon: BookOpen,
      title: "Quality Education",
      description: "Providing comprehensive Islamic and modern education",
    },
    {
      icon: Users,
      title: "Community Focus",
      description: "Serving the community through knowledge and service",
    },
    {
      icon: Globe,
      title: "Global Perspective",
      description: "Preparing students for success in a global context",
    },
  ];

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
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
            About Our Madrasa
          </h1>
          <p className="text-xl md:text-2xl text-cyan-50 max-w-3xl drop-shadow-md">
            Nurturing Islamic Knowledge & Excellence Since 1999
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="border-none shadow-xl bg-white hover:shadow-2xl transition-shadow"
            >
              <CardContent className="p-6 text-center">
                <stat.icon className={`w-12 h-12 mx-auto mb-3 ${stat.color}`} />
                <h3 className="text-3xl font-bold text-slate-900 mb-1">
                  {stat.value}
                </h3>
                <p className="text-slate-600">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Our Story Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=600&fit=crop"
              alt="Madrasa Building"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <Badge className="mb-2 bg-cyan-500">Established 1999</Badge>
              <h3 className="text-2xl font-bold">25+ Years of Excellence</h3>
            </div>
          </div>

          <div>
            <Badge variant="outline" className="mb-4">
              <BookOpen className="w-3 h-3 mr-1" />
              Our Story
            </Badge>
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              Building a Legacy of Islamic Education
            </h2>
            <p className="text-lg text-slate-600 mb-4">
              Founded in 1999, Madrasa MX has been at the forefront of providing
              quality Islamic education combined with modern academic
              excellence. Our journey began with a vision to create an
              institution that bridges traditional Islamic scholarship with
              contemporary educational methods.
            </p>
            <p className="text-lg text-slate-600 mb-6">
              Over the past 25 years, we have educated thousands of students who
              have gone on to become successful professionals, scholars, and
              community leaders while maintaining strong Islamic values and
              principles.
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
          {values.map((value, index) => (
            <Card
              key={index}
              className="border-none shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 bg-gradient-to-br from-white to-slate-50"
            >
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-slate-600">{value.description}</p>
              </CardContent>
            </Card>
          ))}
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
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem
                value="item-1"
                className="bg-white/10 backdrop-blur-sm border-white/20 rounded-lg px-6"
              >
                <AccordionTrigger className="text-white hover:text-cyan-200">
                  What is the admission process?
                </AccordionTrigger>
                <AccordionContent className="text-slate-300">
                  The admission process includes submitting an online
                  application, providing required documents, attending an
                  entrance assessment, and an interview with the admission
                  committee. Applications are open throughout the year with
                  specific intake periods.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-2"
                className="bg-white/10 backdrop-blur-sm border-white/20 rounded-lg px-6"
              >
                <AccordionTrigger className="text-white hover:text-cyan-200">
                  What courses do you offer?
                </AccordionTrigger>
                <AccordionContent className="text-slate-300">
                  We offer comprehensive Islamic studies including Quran
                  memorization, Tajweed, Arabic language, Islamic jurisprudence
                  (Fiqh), Hadith studies, and Islamic history. We also provide
                  modern subjects aligned with national curriculum standards.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-3"
                className="bg-white/10 backdrop-blur-sm border-white/20 rounded-lg px-6"
              >
                <AccordionTrigger className="text-white hover:text-cyan-200">
                  Are there scholarships available?
                </AccordionTrigger>
                <AccordionContent className="text-slate-300">
                  Yes, we offer merit-based and need-based scholarships to
                  deserving students. Scholarships cover partial to full tuition
                  fees depending on the student's performance and family
                  circumstances. Applications are reviewed each semester.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-4"
                className="bg-white/10 backdrop-blur-sm border-white/20 rounded-lg px-6"
              >
                <AccordionTrigger className="text-white hover:text-cyan-200">
                  What are the class timings?
                </AccordionTrigger>
                <AccordionContent className="text-slate-300">
                  We offer flexible timings with morning sessions from 8:00 AM
                  to 12:00 PM and afternoon sessions from 2:00 PM to 6:00 PM.
                  Weekend classes are also available. Specific timings vary by
                  program and level.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-5"
                className="bg-white/10 backdrop-blur-sm border-white/20 rounded-lg px-6"
              >
                <AccordionTrigger className="text-white hover:text-cyan-200">
                  Do you provide transportation?
                </AccordionTrigger>
                <AccordionContent className="text-slate-300">
                  Yes, we provide safe and reliable transportation services
                  covering major areas of the city. Our buses are equipped with
                  GPS tracking and supervised by trained staff to ensure student
                  safety.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
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
    </div>
  );
}
