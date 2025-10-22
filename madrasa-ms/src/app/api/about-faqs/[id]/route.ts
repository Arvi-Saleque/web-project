import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Fetch single about FAQ
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const aboutFAQ = await prisma.aboutFAQ.findUnique({
      where: { id: params.id },
    });

    if (!aboutFAQ) {
      return NextResponse.json(
        { error: "About FAQ not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(aboutFAQ);
  } catch (error) {
    console.error("Error fetching about FAQ:", error);
    return NextResponse.json(
      { error: "Failed to fetch about FAQ" },
      { status: 500 }
    );
  }
}

// PUT - Update about FAQ
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    const updatedAboutFAQ = await prisma.aboutFAQ.update({
      where: { id: params.id },
      data: {
        question: body.question,
        answer: body.answer,
        order: body.order,
      },
    });

    return NextResponse.json(updatedAboutFAQ);
  } catch (error) {
    console.error("Error updating about FAQ:", error);
    return NextResponse.json(
      { error: "Failed to update about FAQ" },
      { status: 500 }
    );
  }
}

// DELETE - Delete about FAQ
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.aboutFAQ.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "About FAQ deleted successfully" });
  } catch (error) {
    console.error("Error deleting about FAQ:", error);
    return NextResponse.json(
      { error: "Failed to delete about FAQ" },
      { status: 500 }
    );
  }
}
