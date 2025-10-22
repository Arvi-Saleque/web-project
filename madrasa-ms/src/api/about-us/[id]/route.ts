import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// PUT - Update about us content
export async function PUT(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;
    const body = await request.json();
    const {
      storyTitle,
      establishedYear,
      storyContent,
      storyImageUrl,
      values,
      faqs,
    } = body;

    const safeValues = Array.isArray(values) ? values : [];
    const safeFaqs = Array.isArray(faqs) ? faqs : [];

    const aboutUs = await prisma.aboutUs.update({
      where: { id },
      data: {
        storyTitle,
        establishedYear,
        storyContent,
        storyImageUrl,
        values: safeValues as any,
        faqs: safeFaqs as any,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(aboutUs);
  } catch (error) {
    console.error("Error updating about us:", error);
    return NextResponse.json(
      {
        error: "Failed to update about us content",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

// DELETE - Soft delete about us content
export async function DELETE(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;

    await prisma.aboutUs.update({
      where: { id },
      data: { isActive: false },
    });

    return NextResponse.json({ message: "About us content deleted successfully" });
  } catch (error) {
    console.error("Error deleting about us:", error);
    return NextResponse.json(
      {
        error: "Failed to delete about us content",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
