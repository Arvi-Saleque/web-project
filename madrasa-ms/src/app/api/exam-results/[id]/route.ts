import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// PUT update an exam result
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const {
      examName,
      grade,
      examType,
      publishedDate,
      imageUrl,
      pdfUrl,
      status,
      passPercentage,
      order,
      isActive,
    } = body;

    // Parse publishedDate if provided
    let parsedPublishedDate;
    if (publishedDate) {
      parsedPublishedDate = new Date(publishedDate);
      if (isNaN(parsedPublishedDate.getTime())) {
        return NextResponse.json(
          { error: "Invalid publishedDate format" },
          { status: 400 }
        );
      }
    }

    const examResult = await prisma.examResult.update({
      where: { id },
      data: {
        ...(examName && { examName }),
        ...(grade && { grade }),
        ...(examType && { examType }),
        ...(parsedPublishedDate && { publishedDate: parsedPublishedDate }),
        ...(imageUrl && { imageUrl }),
        ...(pdfUrl && { pdfUrl }),
        ...(status && { status }),
        ...(passPercentage !== undefined && {
          passPercentage: parseInt(passPercentage),
        }),
        ...(order !== undefined && { order: parseInt(order) }),
        ...(isActive !== undefined && { isActive }),
      },
    });

    return NextResponse.json(examResult, { status: 200 });
  } catch (error) {
    console.error("Error updating exam result:", error);
    return NextResponse.json(
      { error: "Failed to update exam result" },
      { status: 500 }
    );
  }
}

// DELETE an exam result (soft delete)
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.examResult.update({
      where: { id },
      data: { isActive: false },
    });

    return NextResponse.json(
      { message: "Exam result deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting exam result:", error);
    return NextResponse.json(
      { error: "Failed to delete exam result" },
      { status: 500 }
    );
  }
}
