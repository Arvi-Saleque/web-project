"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar,
  Clock,
  ArrowLeft,
  Newspaper,
  PartyPopper,
  Search,
  Users,
  Trophy,
  BookOpen,
  Filter,
} from "lucide-react";

interface NewsEvent {
  id: string;
  title: string;
  category: "news" | "event" | "achievement" | "announcement";
  date: string;
  time?: string;
  description: string;
  image: string;
  author: string;
  tags: string[];
}

export default function NewsEventsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const newsEvents: NewsEvent[] = [
    {
      id: "1",
      title: "Annual Science Fair 2025",
      category: "event",
      date: "2025-10-22",
      time: "10:00 AM",
      description:
        "Students from all grades will showcase their innovative science projects. Parents and guests are welcome to attend.",
      image: "/placeholder-science.jpg",
      author: "Admin",
      tags: ["Science", "Exhibition", "Students"],
    },
    {
      id: "2",
      title: "Students Win District Sports Championship",
      category: "achievement",
      date: "2025-09-28",
      description:
        "Our school's sports team secured first place in the inter-district sports competition with outstanding performance.",
      image: "/placeholder-sports.jpg",
      author: "Sports Department",
      tags: ["Sports", "Achievement", "Championship"],
    },
    {
      id: "3",
      title: "Parent-Teacher Meeting Schedule",
      category: "announcement",
      date: "2025-10-15",
      time: "2:00 PM",
      description:
        "Quarterly parent-teacher meeting to discuss student progress and academic performance. Attendance is mandatory.",
      image: "/placeholder-meeting.jpg",
      author: "Administration",
      tags: ["Meeting", "Parents", "Academic"],
    },
    {
      id: "4",
      title: "New Computer Lab Inaugurated",
      category: "news",
      date: "2025-09-20",
      description:
        "State-of-the-art computer laboratory with 40 modern computers has been inaugurated to enhance digital learning.",
      image: "/placeholder-computer.jpg",
      author: "Principal",
      tags: ["Technology", "Infrastructure", "Education"],
    },
    {
      id: "5",
      title: "Cultural Program - Independence Day",
      category: "event",
      date: "2025-10-28",
      time: "3:00 PM",
      description:
        "Special cultural program featuring student performances, traditional dances, and patriotic songs.",
      image: "/placeholder-cultural.jpg",
      author: "Cultural Committee",
      tags: ["Culture", "Performance", "Students"],
    },
    {
      id: "6",
      title: "Top Performers in National Math Olympiad",
      category: "achievement",
      date: "2025-09-15",
      description:
        "Three students from our school secured positions in the top 10 of the National Mathematics Olympiad.",
      image: "/placeholder-math.jpg",
      author: "Academic Department",
      tags: ["Mathematics", "Olympiad", "Achievement"],
    },
  ];

  const getCategoryStyle = (category: NewsEvent["category"]) => {
    const styles = {
      news: { bg: "bg-blue-100", text: "text-blue-700", icon: Newspaper },
      event: {
        bg: "bg-purple-100",
        text: "text-purple-700",
        icon: PartyPopper,
      },
      achievement: { bg: "bg-amber-100", text: "text-amber-700", icon: Trophy },
      announcement: {
        bg: "bg-rose-100",
        text: "text-rose-700",
        icon: BookOpen,
      },
    };
    return styles[category];
  };

  const filteredNews = newsEvents.filter((item) => {
    const matchesSearch =
      searchQuery === "" ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const stats = [
    {
      icon: Newspaper,
      value: newsEvents.filter((n) => n.category === "news").length.toString(),
      label: "News Articles",
      color: "text-blue-600",
    },
    {
      icon: PartyPopper,
      value: newsEvents.filter((n) => n.category === "event").length.toString(),
      label: "Upcoming Events",
      color: "text-purple-600",
    },
    {
      icon: Trophy,
      value: newsEvents
        .filter((n) => n.category === "achievement")
        .length.toString(),
      label: "Achievements",
      color: "text-amber-600",
    },
    {
      icon: BookOpen,
      value: newsEvents
        .filter((n) => n.category === "announcement")
        .length.toString(),
      label: "Announcements",
      color: "text-rose-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative h-[300px] bg-cyan-600 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-white text-center">
          <Link href="/">
            <Button
              variant="ghost"
              className="absolute top-6 left-6 text-white hover:bg-white/20"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <Badge
            variant="secondary"
            className="mb-4 bg-white/20 backdrop-blur-sm text-white border-white/30"
          >
            <Newspaper className="w-3 h-3 mr-1" />
            Stay Updated
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-3 drop-shadow-lg">
            News & Events
          </h1>
          <p className="text-lg md:text-xl text-cyan-50 max-w-2xl drop-shadow-md">
            Stay informed about the latest happenings and upcoming events
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 -mt-16 relative z-10 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="border-none shadow-lg bg-white hover:shadow-xl transition-shadow"
            >
              <CardContent className="p-6 text-center">
                <stat.icon className={`w-10 h-10 mx-auto mb-3 ${stat.color}`} />
                <h3 className="text-3xl font-bold text-slate-900 mb-1">
                  {stat.value}
                </h3>
                <p className="text-slate-600 text-sm">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Filter Section */}
      <section className="container mx-auto px-4 mb-8">
        <Card className="border-none shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Search news, events, or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-slate-600" />
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="news">News</SelectItem>
                    <SelectItem value="event">Events</SelectItem>
                    <SelectItem value="achievement">Achievements</SelectItem>
                    <SelectItem value="announcement">Announcements</SelectItem>
                  </SelectContent>
                </Select>
                {(searchQuery || selectedCategory !== "all") && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("all");
                    }}
                  >
                    Clear
                  </Button>
                )}
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm text-slate-600">
              <span>
                Showing <strong>{filteredNews.length}</strong> of{" "}
                <strong>{newsEvents.length}</strong> items
              </span>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* News & Events Grid */}
      <section className="container mx-auto px-4 pb-20">
        {filteredNews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((item) => {
              const categoryStyle = getCategoryStyle(item.category);
              const CategoryIcon = categoryStyle.icon;

              return (
                <Card
                  key={item.id}
                  className="border-none shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 overflow-hidden group"
                >
                  <div className="relative h-48 bg-slate-200 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
                      <CategoryIcon className="w-16 h-16 text-slate-400" />
                    </div>
                    <Badge
                      className={`absolute top-4 right-4 ${categoryStyle.bg} ${categoryStyle.text} border-0`}
                    >
                      <CategoryIcon className="w-3 h-3 mr-1" />
                      {item.category.charAt(0).toUpperCase() +
                        item.category.slice(1)}
                    </Badge>
                  </div>

                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                      <Calendar className="w-3 h-3" />
                      <span>
                        {new Date(item.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      {item.time && (
                        <>
                          <span>•</span>
                          <Clock className="w-3 h-3" />
                          <span>{item.time}</span>
                        </>
                      )}
                    </div>
                    <CardTitle className="text-xl font-bold text-slate-900 line-clamp-2">
                      {item.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent>
                    <p className="text-sm text-slate-600 mb-4 line-clamp-3">
                      {item.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.tags.map((tag, idx) => (
                        <Badge
                          key={idx}
                          variant="outline"
                          className="text-xs bg-slate-50"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t">
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Users className="w-3 h-3" />
                        <span>{item.author}</span>
                      </div>
                      <Button
                        variant="link"
                        className="text-cyan-600 hover:text-cyan-700 p-0 h-auto"
                      >
                        Read More →
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="border-none shadow-lg">
            <CardContent className="p-12 text-center">
              <Search className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                No Results Found
              </h3>
              <p className="text-slate-600 mb-4">
                Try adjusting your search or filter criteria
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </section>

      {/* Info Card */}
      <section className="container mx-auto px-4 pb-20">
        <Card className="border-2 border-cyan-200 bg-cyan-50/50">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Newspaper className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  Stay Connected
                </h3>
                <div className="space-y-2 text-slate-700">
                  <p className="flex items-start gap-2">
                    <span className="font-bold text-cyan-600 mt-0.5">•</span>
                    <span>
                      Check this page regularly for{" "}
                      <strong>latest updates</strong> and announcements
                    </span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="font-bold text-cyan-600 mt-0.5">•</span>
                    <span>
                      Subscribe to our newsletter for{" "}
                      <strong>event notifications</strong>
                    </span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="font-bold text-cyan-600 mt-0.5">•</span>
                    <span>
                      Contact the administration office for{" "}
                      <strong>more information</strong>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
