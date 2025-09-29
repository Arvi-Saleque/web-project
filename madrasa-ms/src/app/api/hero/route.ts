import { NextRequest, NextResponse } from "next/server";
import { verifySessionJWT } from "@/lib/auth";
import { prisma } from "@/lib/db";

interface HeroContent {
  title: string;
  subtitle: string;
  description: string;
  primaryButtonText: string;
  secondaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonLink: string;
}

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const token = request.cookies.get("session")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await verifySessionJWT(token);

    // Get hero content from database
    const heroSection = await prisma.heroSection.findFirst({});

    if (!heroSection) {
      // Return default content if none exists
      const defaultContent: HeroContent = {
        title: "Welcome to Our Madrasa",
        subtitle: "Excellence in Islamic Education",
        description: "Nurturing young minds with comprehensive Islamic education and modern learning approaches.",
        primaryButtonText: "Enroll Now",
        secondaryButtonText: "Learn More",
        primaryButtonLink: "/enroll",
        secondaryButtonLink: "/about",
      };
      return NextResponse.json(defaultContent);
    }

    const heroContent: HeroContent = {
      title: `${heroSection.titleLine1} ${heroSection.titleLine2}`,
      subtitle: heroSection.subtitle,
      description: heroSection.subtitle, // Using subtitle as description for now
      primaryButtonText: heroSection.cta1Text,
      secondaryButtonText: heroSection.cta2Text,
      primaryButtonLink: heroSection.cta1Href,
      secondaryButtonLink: heroSection.cta2Href,
    };

    return NextResponse.json(heroContent);
  } catch (error) {
    console.error("Error fetching hero content:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const token = request.cookies.get("session")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await verifySessionJWT(token);

    const heroContent: HeroContent = await request.json();

    // Validate required fields
    if (!heroContent.title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    // Split title into two lines for the database schema
    const titleParts = heroContent.title.split(' ');
    const midPoint = Math.ceil(titleParts.length / 2);
    const titleLine1 = titleParts.slice(0, midPoint).join(' ');
    const titleLine2 = titleParts.slice(midPoint).join(' ');

    // Update or create hero content in database
    await prisma.heroSection.upsert({
      where: { id: 1 },
      update: {
        titleLine1: titleLine1,
        titleLine2: titleLine2 || '',
        subtitle: heroContent.subtitle || heroContent.description,
        cta1Text: heroContent.primaryButtonText,
        cta1Href: heroContent.primaryButtonLink,
        cta2Text: heroContent.secondaryButtonText,
        cta2Href: heroContent.secondaryButtonLink,
        updatedAt: new Date(),
      },
      create: {
        titleLine1: titleLine1,
        titleLine2: titleLine2 || '',
        subtitle: heroContent.subtitle || heroContent.description,
        bgImageUrl: '/default-hero-bg.jpg', // Default background
        cta1Text: heroContent.primaryButtonText,
        cta1Href: heroContent.primaryButtonLink,
        cta2Text: heroContent.secondaryButtonText,
        cta2Href: heroContent.secondaryButtonLink,
        features: [],
      },
    });

    return NextResponse.json({ success: true, message: "Hero content updated successfully" });
  } catch (error) {
    console.error("Error updating hero content:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}