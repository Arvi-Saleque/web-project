import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Fetch single about value
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const aboutValue = await prisma.aboutValue.findUnique({
      where: { id: params.id },
    });

    if (!aboutValue) {
      return NextResponse.json(
        { error: "About value not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(aboutValue);
  } catch (error) {
    console.error("Error fetching about value:", error);
    return NextResponse.json(
      { error: "Failed to fetch about value" },
      { status: 500 }
    );
  }
}

// PUT - Update about value
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    const updatedAboutValue = await prisma.aboutValue.update({
      where: { id: params.id },
      data: {
        title: body.title,
        description: body.description,
        icon: body.icon,
        order: body.order,
      },
    });

    return NextResponse.json(updatedAboutValue);
  } catch (error) {
    console.error("Error updating about value:", error);
    return NextResponse.json(
      { error: "Failed to update about value" },
      { status: 500 }
    );
  }
}

// DELETE - Delete about value
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.aboutValue.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "About value deleted successfully" });
  } catch (error) {
    console.error("Error deleting about value:", error);
    return NextResponse.json(
      { error: "Failed to delete about value" },
      { status: 500 }
    );
  }
}
