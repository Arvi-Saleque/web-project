import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Fetch about section
export async function GET() {
  try {
    const aboutSection = await prisma.aboutSection.findFirst({
      where: { isActive: true },
    });

    return NextResponse.json(aboutSection);
  } catch (error) {
    console.error("Error fetching about section:", error);
    console.error("Error details:", error instanceof Error ? error.message : String(error));
    return NextResponse.json(
      { error: "Failed to fetch about section", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

// POST - Create about section
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const newAboutSection = await prisma.aboutSection.create({
      data: {
        title: body.title,
        subtitle: body.subtitle,
        establishedYear: parseInt(body.establishedYear),
        storyTitle: body.storyTitle,
        storyContent: body.storyContent,
        storyImageUrl: body.storyImageUrl,
        heroImageUrl: body.heroImageUrl || null,
        isActive: true,
      },
    });

    return NextResponse.json(newAboutSection, { status: 201 });
  } catch (error) {
    console.error("Error creating about section:", error);
    return NextResponse.json(
      { error: "Failed to create about section" },
      { status: 500 }
    );
  }
}

// PUT - Update about section
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    const updatedAboutSection = await prisma.aboutSection.update({
      where: { id },
      data: {
        title: updateData.title,
        subtitle: updateData.subtitle,
        establishedYear: parseInt(updateData.establishedYear),
        storyTitle: updateData.storyTitle,
        storyContent: updateData.storyContent,
        storyImageUrl: updateData.storyImageUrl,
        heroImageUrl: updateData.heroImageUrl || null,
      },
    });

    return NextResponse.json(updatedAboutSection);
  } catch (error) {
    console.error("Error updating about section:", error);
    return NextResponse.json(
      { error: "Failed to update about section" },
      { status: 500 }
    );
  }
}
