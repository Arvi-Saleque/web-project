"use client";

import { useState } from "react";
import Link from "next/link";
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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Building2,
  User,
  CheckCircle2,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });

      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone Number",
      details: ["+880 1234-567890", "+880 1234-567891"],
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      icon: Mail,
      title: "Email Address",
      details: ["info@madrasa.edu", "admission@madrasa.edu"],
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      icon: MapPin,
      title: "Location",
      details: ["123 Education Street", "Dhaka, Bangladesh"],
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      icon: Clock,
      title: "Working Hours",
      details: [
        "Sunday - Thursday: 8:00 AM - 4:00 PM",
        "Friday - Saturday: Closed",
      ],
      color: "text-rose-600",
      bg: "bg-rose-50",
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
            <MessageSquare className="w-3 h-3 mr-1" />
            Get in Touch
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-3 drop-shadow-lg">
            Contact Us
          </h1>
          <p className="text-lg md:text-xl text-cyan-50 max-w-2xl drop-shadow-md">
            We're here to help. Reach out to us anytime
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="container mx-auto px-4 -mt-16 relative z-10 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((info, index) => (
            <Card
              key={index}
              className="border-none shadow-lg bg-white hover:shadow-xl transition-shadow"
            >
              <CardContent className="p-6">
                <div
                  className={`w-12 h-12 ${info.bg} rounded-full flex items-center justify-center mb-4`}
                >
                  <info.icon className={`w-6 h-6 ${info.color}`} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {info.title}
                </h3>
                {info.details.map((detail, idx) => (
                  <p key={idx} className="text-sm text-slate-600">
                    {detail}
                  </p>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Main Content - Form & Map */}
      <section className="container mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card className="border-none shadow-xl">
            <CardHeader className="border-b bg-slate-50/50">
              <CardTitle className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <Send className="w-6 h-6 text-cyan-600" />
                Send us a Message
              </CardTitle>
              <CardDescription className="mt-1">
                Fill out the form below and we'll get back to you as soon as
                possible
              </CardDescription>
            </CardHeader>

            <CardContent className="p-6">
              {isSubmitted && (
                <div className="mb-6 p-4 bg-green-50 border-2 border-green-200 rounded-lg flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-green-900 mb-1">
                      Message Sent Successfully!
                    </h4>
                    <p className="text-sm text-green-700">
                      Thank you for contacting us. We'll respond within 24
                      hours.
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-2">
                    <User className="w-4 h-4 text-slate-500" />
                    Full Name <span className="text-rose-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    className="border-slate-300"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-slate-500" />
                      Email Address <span className="text-rose-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                      className="border-slate-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-slate-500" />
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+880 1234-567890"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="border-slate-300"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-slate-500" />
                    Subject <span className="text-rose-500">*</span>
                  </Label>
                  <Select
                    value={formData.subject}
                    onValueChange={(value) =>
                      setFormData({ ...formData, subject: value })
                    }
                    required
                  >
                    <SelectTrigger className="border-slate-300">
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admission">
                        Admission Inquiry
                      </SelectItem>
                      <SelectItem value="academic">
                        Academic Information
                      </SelectItem>
                      <SelectItem value="general">General Question</SelectItem>
                      <SelectItem value="complaint">Complaint</SelectItem>
                      <SelectItem value="feedback">Feedback</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-slate-500" />
                    Message <span className="text-rose-500">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Write your message here..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                    rows={6}
                    className="border-slate-300 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-cyan-600 hover:bg-cyan-700 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Location Map */}
          <Card className="border-none shadow-xl">
            <CardHeader className="border-b bg-slate-50/50">
              <CardTitle className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <MapPin className="w-6 h-6 text-cyan-600" />
                Our Location
              </CardTitle>
              <CardDescription className="mt-1">
                Find us on the map and visit our campus
              </CardDescription>
            </CardHeader>

            <CardContent className="p-0">
              {/* Google Maps Embed */}
              <div className="w-full h-[500px] bg-slate-100">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.9009593164417!2d90.39169831498181!3d23.750891084588743!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2sDhaka%2C%20Bangladesh!5e0!3m2!1sen!2s!4v1633384839234!5m2!1sen!2s"
                  width="100%"
                  height="500"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-b-lg"
                ></iframe>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Additional Info */}
      <section className="container mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Office Hours Card */}
          <Card className="border-2 border-blue-200 bg-blue-50/50">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">
                    Office Hours
                  </h3>
                  <div className="space-y-2 text-slate-700">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Sunday - Thursday:</span>
                      <span className="text-blue-600">8:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Friday - Saturday:</span>
                      <span className="text-rose-600">Closed</span>
                    </div>
                    <p className="text-sm text-slate-600 mt-3 pt-3 border-t border-blue-200">
                      For urgent matters outside office hours, please email us
                      and we'll respond as soon as possible.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Tips Card */}
          <Card className="border-2 border-purple-200 bg-purple-50/50">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">
                    Before You Contact
                  </h3>
                  <div className="space-y-2 text-slate-700">
                    <p className="flex items-start gap-2">
                      <span className="font-bold text-purple-600 mt-0.5">
                        •
                      </span>
                      <span>
                        Check our <strong>FAQ section</strong> for common
                        questions
                      </span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="font-bold text-purple-600 mt-0.5">
                        •
                      </span>
                      <span>
                        Provide <strong>detailed information</strong> in your
                        message
                      </span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="font-bold text-purple-600 mt-0.5">
                        •
                      </span>
                      <span>
                        We typically respond within <strong>24 hours</strong>
                      </span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="font-bold text-purple-600 mt-0.5">
                        •
                      </span>
                      <span>
                        For admission queries, visit the{" "}
                        <strong>Admission page</strong>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
