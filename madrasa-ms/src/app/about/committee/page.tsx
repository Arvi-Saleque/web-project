import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  Shield,
  Briefcase,
  Calendar,
  ArrowLeft,
  Heart,
  Target,
  Award,
  Building2,
} from "lucide-react";
import Footer from "@/components/common/footer";
import Navbar from "@/components/common/navbar";

export default function CommitteePage() {
  const committeeMembers = [
    {
      id: 1,
      name: "Haji Abdul Malik",
      position: "Chairman",
      organization: "Business Entrepreneur",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop",
      tenure: "2020 - Present",
      description: "Leading strategic vision and governance",
      icon: Shield,
      color: "cyan",
    },
    {
      id: 2,
      name: "Dr. Zakir Ahmed",
      position: "Vice Chairman",
      organization: "Medical Professional",
      image:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
      tenure: "2021 - Present",
      description: "Supporting administrative excellence",
      icon: Award,
      color: "blue",
    },
    {
      id: 3,
      name: "Eng. Rashid Mahmood",
      position: "Secretary",
      organization: "Civil Engineer",
      image:
        "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400&h=400&fit=crop",
      tenure: "2020 - Present",
      description: "Managing operations and documentation",
      icon: Briefcase,
      color: "purple",
    },
    {
      id: 4,
      name: "Mr. Tariq Hasan",
      position: "Treasurer",
      organization: "Chartered Accountant",
      image:
        "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop",
      tenure: "2022 - Present",
      description: "Overseeing financial management",
      icon: Building2,
      color: "amber",
    },
    {
      id: 5,
      name: "Mrs. Zainab Khalid",
      position: "Member",
      organization: "Social Worker",
      image:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop",
      tenure: "2021 - Present",
      description: "Community outreach and welfare",
      icon: Heart,
      color: "pink",
    },
    {
      id: 6,
      name: "Prof. Imran Siddiqui",
      position: "Member",
      organization: "University Professor",
      image:
        "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=400&h=400&fit=crop",
      tenure: "2020 - Present",
      description: "Academic development and curriculum",
      icon: Target,
      color: "indigo",
    },
  ];

  const responsibilities = [
    {
      icon: Target,
      title: "Strategic Planning",
      description: "Setting long-term goals and direction",
    },
    {
      icon: Shield,
      title: "Governance",
      description: "Ensuring ethical practices and compliance",
    },
    {
      icon: Building2,
      title: "Financial Oversight",
      description: "Managing budgets and resources",
    },
    {
      icon: Users,
      title: "Community Engagement",
      description: "Building relationships with stakeholders",
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: {
      [key: string]: { bg: string; text: string; badge: string };
    } = {
      cyan: { bg: "bg-cyan-500", text: "text-cyan-600", badge: "bg-cyan-100" },
      blue: { bg: "bg-blue-500", text: "text-blue-600", badge: "bg-blue-100" },
      purple: {
        bg: "bg-purple-500",
        text: "text-purple-600",
        badge: "bg-purple-100",
      },
      amber: {
        bg: "bg-amber-500",
        text: "text-amber-600",
        badge: "bg-amber-100",
      },
      pink: { bg: "bg-pink-500", text: "text-pink-600", badge: "bg-pink-100" },
      indigo: {
        bg: "bg-indigo-500",
        text: "text-indigo-600",
        badge: "bg-indigo-100",
      },
    };
    return colors[color] || colors.cyan;
  };

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
            <Users className="w-3 h-3 mr-1" />
            Leadership
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            Management Committee
          </h1>
          <p className="text-xl md:text-2xl text-cyan-50 max-w-3xl drop-shadow-md">
            Dedicated leaders guiding our institution towards excellence
          </p>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <Badge variant="outline" className="mb-4">
            <Shield className="w-3 h-3 mr-1" />
            Our Leadership
          </Badge>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Committed to Excellence
          </h2>
          <p className="text-lg text-slate-600">
            Our management committee comprises accomplished professionals from
            diverse fields, united by a shared commitment to advancing Islamic
            education and serving the community.
          </p>
        </div>

        {/* Committee Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-20">
          {committeeMembers.map((member) => {
            const colors = getColorClasses(member.color);
            return (
              <Card
                key={member.id}
                className="border-none shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 overflow-hidden group"
              >
                {/* Member Image */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

                  {/* Position Badge */}
                  <div className="absolute top-4 right-4">
                    <div
                      className={`w-12 h-12 ${colors.bg} rounded-full flex items-center justify-center shadow-lg`}
                    >
                      <member.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>

                {/* Member Info Card */}
                <CardContent className="p-6 -mt-12 relative z-10">
                  <div className="bg-white rounded-xl p-5 shadow-xl">
                    <h3 className="text-xl font-bold text-slate-900 mb-1">
                      {member.name}
                    </h3>
                    <Badge
                      className={`${colors.badge} ${colors.text} border-none mb-3`}
                    >
                      {member.position}
                    </Badge>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Briefcase className="w-4 h-4 flex-shrink-0" />
                        <span className="font-medium">
                          {member.organization}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Calendar className="w-4 h-4 flex-shrink-0" />
                        <span>Tenure: {member.tenure}</span>
                      </div>
                    </div>

                    <p className="text-sm text-slate-600 italic">
                      {member.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Responsibilities Section */}
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">
              <Target className="w-3 h-3 mr-1" />
              Key Responsibilities
            </Badge>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Committee Responsibilities
            </h2>
            <p className="text-lg text-slate-600">
              Our committee ensures effective governance and sustainable growth
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {responsibilities.map((item, index) => (
              <Card
                key={index}
                className="border-none shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 bg-gradient-to-br from-white to-slate-50"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-slate-600">{item.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
