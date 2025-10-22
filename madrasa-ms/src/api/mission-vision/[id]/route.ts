import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = Promise<{ id: string }>;

// PUT - Update mission & vision content
export async function PUT(request: Request, props: { params: Params }) {
  const params = await props.params;
  try {
    const { id } = params;
    const body = await request.json();

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

    const missionVision = await prisma.missionVision.update({
      where: { id },
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
        order,
        isActive,
      } as any,
    });

    return NextResponse.json(missionVision);
  } catch (error) {
    console.error("Error updating mission & vision:", error);
    return NextResponse.json(
      { error: "Failed to update mission & vision content" },
      { status: 500 }
    );
  }
}

// DELETE - Soft delete mission & vision content
export async function DELETE(request: Request, props: { params: Params }) {
  const params = await props.params;
  try {
    const { id } = params;

    const missionVision = await prisma.missionVision.update({
      where: { id },
      data: { isActive: false },
    });

    return NextResponse.json(missionVision);
  } catch (error) {
    console.error("Error deleting mission & vision:", error);
    return NextResponse.json(
      { error: "Failed to delete mission & vision content" },
      { status: 500 }
    );
  }
}
