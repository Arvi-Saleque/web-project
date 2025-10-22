import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// PUT update a class routine
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const {
      grade,
      section,
      term,
      imageUrl,
      pdfUrl,
      updatedDate,
      order,
      isActive,
    } = body;

    // Parse updatedDate if provided
    let parsedUpdatedDate;
    if (updatedDate) {
      parsedUpdatedDate = new Date(updatedDate);
      if (isNaN(parsedUpdatedDate.getTime())) {
        return NextResponse.json(
          { error: "Invalid updatedDate format" },
          { status: 400 }
        );
      }
    }

    const classRoutine = await prisma.classRoutine.update({
      where: { id },
      data: {
        ...(grade && { grade }),
        ...(section && { section }),
        ...(term && { term }),
        ...(imageUrl && { imageUrl }),
        ...(pdfUrl && { pdfUrl }),
        ...(parsedUpdatedDate && { updatedDate: parsedUpdatedDate }),
        ...(order !== undefined && { order: parseInt(order) }),
        ...(isActive !== undefined && { isActive }),
      },
    });

    return NextResponse.json(classRoutine, { status: 200 });
  } catch (error) {
    console.error("Error updating class routine:", error);
    return NextResponse.json(
      { error: "Failed to update class routine" },
      { status: 500 }
    );
  }
}

// DELETE a class routine (soft delete)
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.classRoutine.update({
      where: { id },
      data: { isActive: false },
    });

    return NextResponse.json(
      { message: "Class routine deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting class routine:", error);
    return NextResponse.json(
      { error: "Failed to delete class routine" },
      { status: 500 }
    );
  }
}
