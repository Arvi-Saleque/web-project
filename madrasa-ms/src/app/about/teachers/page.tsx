"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  GraduationCap,
  Award,
  BookOpen,
  Mail,
  Calendar,
  ArrowLeft,
  Users,
  Trophy,
  Star,
  Phone,
} from "lucide-react";

export default function TeachersPage() {
  const teachers = [
    {
      id: 1,
      name: "Dr. Abdul Rahman Khan",
      position: "Principal",
      qualification: "Ph.D in Islamic Studies",
      experience: "25 years",
      specialization: "Quranic Sciences & Hadith",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      email: "principal@madrasa.edu",
      achievements: [
        "Published 15+ research papers",
        "National Award Winner 2020",
      ],
      category: "Senior Faculty",
    },
    {
      id: 2,
      name: "Ustaz Muhammad Yusuf",
      position: "Head of Arabic Department",
      qualification: "Master in Arabic Literature",
      experience: "18 years",
      specialization: "Arabic Language & Grammar",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      email: "yusuf@madrasa.edu",
      achievements: ["Authored 3 Arabic textbooks", "Best Teacher Award 2019"],
      category: "Senior Faculty",
    },
    {
      id: 3,
      name: "Dr. Fatima Hassan",
      position: "Head of Islamic Studies",
      qualification: "Ph.D in Islamic Jurisprudence",
      experience: "20 years",
      specialization: "Fiqh & Islamic Law",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      email: "fatima@madrasa.edu",
      achievements: ["International speaker", "Published author"],
      category: "Senior Faculty",
    },
    {
      id: 4,
      name: "Sheikh Ahmed Ibrahim",
      position: "Quran & Tajweed Instructor",
      qualification: "Ijazah in Quran Recitation",
      experience: "15 years",
      specialization: "Quran Memorization & Tajweed",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
      email: "ahmed@madrasa.edu",
      achievements: ["Trained 500+ Huffaz", "Master in 7 Qira'at"],
      category: "Quran Department",
    },
    {
      id: 5,
      name: "Ustaza Aisha Rahman",
      position: "Senior Lecturer",
      qualification: "Master in Islamic Education",
      experience: "12 years",
      specialization: "Islamic History & Seerah",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      email: "aisha@madrasa.edu",
      achievements: ["Curriculum developer", "Educational consultant"],
      category: "Islamic Studies",
    },
    {
      id: 6,
      name: "Dr. Hamza Ali",
      position: "Academic Coordinator",
      qualification: "Ph.D in Educational Leadership",
      experience: "16 years",
      specialization: "Educational Management",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
      email: "hamza@madrasa.edu",
      achievements: ["Educational reformer", "Policy advisor"],
      category: "Administration",
    },
  ];

  const stats = [
    { icon: Users, value: "150+", label: "Expert Teachers" },
    { icon: Award, value: "25+", label: "Years Average Experience" },
    { icon: Trophy, value: "50+", label: "Awards & Recognitions" },
    { icon: BookOpen, value: "30+", label: "Specialized Courses" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
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
            <GraduationCap className="w-3 h-3 mr-1" />
            Our Faculty
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            Our Distinguished Teachers
          </h1>
          <p className="text-xl md:text-2xl text-cyan-50 max-w-3xl drop-shadow-md">
            Learn from experienced scholars dedicated to your success
          </p>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="container mx-auto px-4 -mt-20 relative z-10 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="border-none shadow-xl bg-white hover:shadow-2xl transition-shadow"
            >
              <CardContent className="p-6 text-center">
                <stat.icon className="w-12 h-12 mx-auto mb-3 text-cyan-600" />
                <h3 className="text-3xl font-bold text-slate-900 mb-1">
                  {stat.value}
                </h3>
                <p className="text-slate-600">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Teachers Grid Section */}
      <section className="container mx-auto px-4 pb-20">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            <Star className="w-3 h-3 mr-1" />
            Meet Our Team
          </Badge>
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Faculty Members
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Dedicated educators combining traditional scholarship with modern
            teaching methods
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {teachers.map((teacher) => (
            <Card
              key={teacher.id}
              className="border-none shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 overflow-hidden group"
            >
              {/* Teacher Image */}
              <div className="relative h-72 overflow-hidden">
                <Image
                  src={teacher.image}
                  alt={teacher.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

                {/* Name and Position Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <Badge className="mb-2 bg-cyan-500 text-white border-none">
                    {teacher.category}
                  </Badge>
                  <h3 className="text-2xl font-bold mb-1">{teacher.name}</h3>
                  <p className="text-cyan-100 text-sm">{teacher.position}</p>
                </div>
              </div>

              {/* Teacher Details */}
              <CardContent className="p-6 space-y-4">
                {/* Qualification */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Award className="w-5 h-5 text-cyan-600" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      Qualification
                    </p>
                    <p className="text-sm text-slate-900 font-medium">
                      {teacher.qualification}
                    </p>
                  </div>
                </div>

                {/* Experience */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      Experience
                    </p>
                    <p className="text-sm text-slate-900 font-medium">
                      {teacher.experience}
                    </p>
                  </div>
                </div>

                {/* Specialization */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      Specialization
                    </p>
                    <p className="text-sm text-slate-900 font-medium">
                      {teacher.specialization}
                    </p>
                  </div>
                </div>

                {/* Achievements */}
                <div className="pt-4 border-t border-slate-200">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                    Key Achievements
                  </p>
                  <div className="space-y-2">
                    {teacher.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <Trophy className="w-3 h-3 text-amber-600 mt-0.5 flex-shrink-0" />
                        <p className="text-xs text-slate-600">{achievement}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact Button */}
                <Button
                  variant="outline"
                  className="w-full mt-4 group/btn hover:bg-cyan-50 hover:border-cyan-600"
                >
                  <Mail className="w-4 h-4 mr-2 group-hover/btn:text-cyan-600 transition-colors" />
                  <span className="text-sm truncate">{teacher.email}</span>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-20 bg-cyan-900">
        <div className="container mx-auto px-4">
          <Card className="border-none shadow-2xl bg-white/10 backdrop-blur-sm overflow-hidden max-w-4xl mx-auto">
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <blockquote className="text-2xl md:text-3xl font-bold text-white mb-4 leading-relaxed">
                "A teacher can never truly teach unless he is still learning
                himself"
              </blockquote>
              <p className="text-cyan-100 text-lg">
                Our educators are lifelong learners committed to continuous
                growth
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Learn from the Best
          </h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            Join our institution and benefit from expert guidance and mentorship
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href={"/about/teachers"}>
              <Button size="lg" className="bg-cyan-600 hover:bg-cyan-700">
                <Users className="w-4 h-4 mr-2" />
                Join Now
              </Button>
            </Link>
            <Link href={"/about/teachers"}>
              <Button size="lg" className="bg-cyan-600 hover:bg-cyan-700">
                <Phone className="w-4 h-4 mr-2" />
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
