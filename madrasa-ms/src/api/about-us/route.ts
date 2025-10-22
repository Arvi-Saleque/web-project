import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Fetch all about us content
export async function GET() {
  try {
    const aboutUs = await prisma.aboutUs.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    });

    return NextResponse.json(aboutUs);
  } catch (error) {
    console.error("Error fetching about us:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch about us content",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

// POST - Create new about us content
export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Received About Us POST body:", body);
    const {
      storyTitle,
      establishedYear,
      storyContent,
      storyImageUrl,
      values,
      faqs,
      order = 0,
    } = body;

    // Validate required fields
    if (
      !storyTitle ||
      !establishedYear ||
      !storyContent ||
      !storyImageUrl
    ) {
      return NextResponse.json(
        { error: "Story title, year, content, and image are required" },
        { status: 400 }
      );
    }

    // Ensure values and faqs are arrays (valid JSON)
    const safeValues = Array.isArray(values) ? values : [];
    const safeFaqs = Array.isArray(faqs) ? faqs : [];

    const aboutUs = await prisma.aboutUs.create({
      data: {
        storyTitle,
        establishedYear,
        storyContent,
        storyImageUrl,
        values: safeValues as any,
        faqs: safeFaqs as any,
        order,
      },
    });

    return NextResponse.json(aboutUs, { status: 201 });
  } catch (error) {
    console.error("Error creating about us:", error);
    return NextResponse.json(
      {
        error: "Failed to create about us content",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
