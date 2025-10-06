"use client";

import * as React from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BookOpen,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  Users,
  GraduationCap,
  Loader2,
} from "lucide-react";

type UserRole = "ADMIN" | "TEACHER" | "STUDENT";

export default function LoginPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<UserRole>("ADMIN");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.toLowerCase(),
          password,
          role: selectedRole,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      // Store user data in localStorage or session
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirect based on role
      switch (selectedRole) {
        case "ADMIN":
          router.push("/admin/dashboard");
          break;
        case "TEACHER":
          router.push("/teacher/dashboard");
          break;
        case "STUDENT":
          router.push("/student/dashboard");
          break;
      }
    } catch (err: any) {
      setError(err.message || "Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case "ADMIN":
        return <ShieldCheck className="h-5 w-5" />;
      case "TEACHER":
        return <Users className="h-5 w-5" />;
      case "STUDENT":
        return <GraduationCap className="h-5 w-5" />;
    }
  };

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case "ADMIN":
        return "data-[state=active]:bg-red-500 data-[state=active]:text-white";
      case "TEACHER":
        return "data-[state=active]:bg-primary data-[state=active]:text-white";
      case "STUDENT":
        return "data-[state=active]:bg-green-500 data-[state=active]:text-white";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50 p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex flex-col justify-center space-y-6 p-8">
          <div className="flex items-center space-x-3">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
              <BookOpen className="h-10 w-10" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Madrasa</h1>
              <p className="text-xl text-muted-foreground">Management System</p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Welcome Back!</h2>
            <p className="text-lg text-muted-foreground">
              Sign in to access your dashboard and manage your institution
              efficiently.
            </p>
          </div>

          {/* Features */}
          <div className="space-y-4 pt-6">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold">Secure Access</h3>
                <p className="text-sm text-muted-foreground">
                  Role-based authentication for enhanced security
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold">Multi-Role Support</h3>
                <p className="text-sm text-muted-foreground">
                  Admin, Teacher, and Student portals
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold">Comprehensive Management</h3>
                <p className="text-sm text-muted-foreground">
                  Complete academic and administrative tools
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <Card className="w-full shadow-2xl border-0">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
            <CardDescription>
              Choose your role and enter your credentials to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs
              value={selectedRole}
              onValueChange={(value) => {
                setSelectedRole(value as UserRole);
                setError("");
              }}
              className="w-full"
            >
              {/* Role Selection Tabs */}
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="ADMIN" className={getRoleColor("ADMIN")}>
                  <div className="flex items-center gap-2">
                    {getRoleIcon("ADMIN")}
                    <span className="hidden sm:inline">Admin</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="TEACHER"
                  className={getRoleColor("TEACHER")}
                >
                  <div className="flex items-center gap-2">
                    {getRoleIcon("TEACHER")}
                    <span className="hidden sm:inline">Teacher</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="STUDENT"
                  className={getRoleColor("STUDENT")}
                >
                  <div className="flex items-center gap-2">
                    {getRoleIcon("STUDENT")}
                    <span className="hidden sm:inline">Student</span>
                  </div>
                </TabsTrigger>
              </TabsList>

              {/* Login Forms for Each Role */}
              {["ADMIN", "TEACHER", "STUDENT"].map((role) => (
                <TabsContent key={role} value={role} className="space-y-4">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Email Input */}
                    <div className="space-y-2">
                      <Label htmlFor={`email-${role}`}>Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id={`email-${role}`}
                          type="email"
                          placeholder={`${role.toLowerCase()}@madrasa.edu`}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10"
                          required
                          disabled={isLoading}
                        />
                      </div>
                    </div>

                    {/* Password Input */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor={`password-${role}`}>Password</Label>
                        <Link
                          href="/forgot-password"
                          className="text-sm text-primary hover:underline"
                        >
                          Forgot?
                        </Link>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id={`password-${role}`}
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pl-10 pr-10"
                          required
                          disabled={isLoading}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                          disabled={isLoading}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                      <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                        <p className="text-sm text-destructive">{error}</p>
                      </div>
                    )}

                    {/* Demo Credentials Info */}
                    <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                      <p className="text-xs text-muted-foreground">
                        <strong>Demo Credentials:</strong>
                        <br />
                        Email: {role.toLowerCase()}@madrasa.edu
                        <br />
                        Password: password123
                      </p>
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      className="w-full h-11"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Signing in...
                        </>
                      ) : (
                        <>Sign in as {role}</>
                      )}
                    </Button>
                  </form>
                </TabsContent>
              ))}
            </Tabs>

            {/* Footer Links */}
            <div className="mt-6 text-center text-sm text-muted-foreground">
              <Link href="/" className="hover:text-primary transition-colors">
                ← Back to Home
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
