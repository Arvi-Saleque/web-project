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
} from "lucide-react";

export default function Home() {
  return (
    <div>
      <Header />

      {/* Services Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center space-y-4 mb-16">
          <Badge className="bg-cyan-100 text-cyan-700 border-cyan-300">
            What We Offer
          </Badge>
          <h2 className="text-4xl font-bold text-slate-900">Our Services</h2>
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-5xl font-bold mb-2">500+</div>
              <p className="text-cyan-100 text-lg">Students</p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">50+</div>
              <p className="text-cyan-100 text-lg">Teachers</p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">20+</div>
              <p className="text-cyan-100 text-lg">Years</p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">95%</div>
              <p className="text-cyan-100 text-lg">Success Rate</p>
            </div>
          </div>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-2 border-slate-200 hover:border-cyan-300 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="w-6 h-6 text-cyan-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    Qualified Teachers
                  </h3>
                  <p className="text-sm text-slate-600">
                    Experienced and dedicated faculty committed to student
                    success
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-slate-200 hover:border-cyan-300 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    Modern Curriculum
                  </h3>
                  <p className="text-sm text-slate-600">
                    Updated syllabus combining traditional and modern education
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-slate-200 hover:border-cyan-300 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Trophy className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    Proven Results
                  </h3>
                  <p className="text-sm text-slate-600">
                    Consistent track record of academic excellence and
                    achievements
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-slate-200 hover:border-cyan-300 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    Holistic Approach
                  </h3>
                  <p className="text-sm text-slate-600">
                    Focus on academic, moral, and character development
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-slate-200 hover:border-cyan-300 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-rose-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    Safe Environment
                  </h3>
                  <p className="text-sm text-slate-600">
                    Secure and nurturing atmosphere for optimal learning
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-slate-200 hover:border-cyan-300 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Star className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    Extracurricular Activities
                  </h3>
                  <p className="text-sm text-slate-600">
                    Sports, cultural programs, and community engagement
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
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
                    Calendar
                  </h3>
                  <p className="text-sm text-slate-600">Important dates</p>
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
    </div>
  );
}
