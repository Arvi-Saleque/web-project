import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Fetch active mission & vision content
export async function GET() {
  try {
    const missionVision = await prisma.missionVision.findFirst({
      where: { isActive: true },
      orderBy: { order: "asc" },
    });

    return NextResponse.json(missionVision || null);
  } catch (error) {
    console.error("Error fetching mission & vision:", error);
    return NextResponse.json(
      { error: "Failed to fetch mission & vision content" },
      { status: 500 }
    );
  }
}

// POST - Create new mission & vision content
export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Received mission & vision data:", body);

    const {
      missionTitle,
      missionText,
      missionImageUrl,
      missionPoints,
      visionTitle,
      visionText,
      visionImageUrl,
      visionPoints,
      quoteText,
      quoteSubtext,
      quoteIcon,
      ctaTitle,
      ctaSubtitle,
      ctaButtonText,
      ctaButtonLink,
      order,
      isActive,
    } = body;

    // Validate required fields
    if (
      !missionTitle ||
      !missionText ||
      !missionImageUrl ||
      !visionTitle ||
      !visionText ||
      !visionImageUrl ||
      !quoteText ||
      !quoteSubtext ||
      !quoteIcon ||
      !ctaTitle ||
      !ctaSubtitle ||
      !ctaButtonText ||
      !ctaButtonLink
    ) {
      return NextResponse.json(
        {
          error: "Missing required fields",
          details: "All text and image fields are required",
        },
        { status: 400 }
      );
    }

    console.log("Creating mission & vision with data:", {
      missionTitle,
      visionTitle,
      quoteText: quoteText.substring(0, 50),
      ctaTitle,
    });

    const missionVision = await prisma.missionVision.create({
      data: {
        missionTitle,
        missionText,
        missionImageUrl,
        missionPoints: missionPoints || [],
        visionTitle,
        visionText,
        visionImageUrl,
        visionPoints: visionPoints || [],
        quoteText,
        quoteSubtext,
        quoteIcon,
        ctaTitle,
        ctaSubtitle,
        ctaButtonText,
        ctaButtonLink,
        order: order || 0,
        isActive: isActive !== undefined ? isActive : true,
      } as any,
    });

    console.log("Created mission & vision successfully:", missionVision.id);

    return NextResponse.json(missionVision, { status: 201 });
  } catch (error) {
    console.error("Error creating mission & vision:", error);
    return NextResponse.json(
      {
        error: "Failed to create mission & vision content",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
