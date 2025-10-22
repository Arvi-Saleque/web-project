import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Fetch single about stat
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const aboutStat = await prisma.aboutStat.findUnique({
      where: { id: params.id },
    });

    if (!aboutStat) {
      return NextResponse.json(
        { error: "About stat not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(aboutStat);
  } catch (error) {
    console.error("Error fetching about stat:", error);
    return NextResponse.json(
      { error: "Failed to fetch about stat" },
      { status: 500 }
    );
  }
}

// PUT - Update about stat
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    const updatedAboutStat = await prisma.aboutStat.update({
      where: { id: params.id },
      data: {
        label: body.label,
        value: body.value,
        icon: body.icon,
        color: body.color,
        order: body.order,
      },
    });

    return NextResponse.json(updatedAboutStat);
  } catch (error) {
    console.error("Error updating about stat:", error);
    return NextResponse.json(
      { error: "Failed to update about stat" },
      { status: 500 }
    );
  }
}

// DELETE - Delete about stat
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.aboutStat.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "About stat deleted successfully" });
  } catch (error) {
    console.error("Error deleting about stat:", error);
    return NextResponse.json(
      { error: "Failed to delete about stat" },
      { status: 500 }
    );
  }
}
