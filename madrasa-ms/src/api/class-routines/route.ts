import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all class routines
export async function GET() {
  try {
    const classRoutines = await prisma.classRoutine.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    });

    return NextResponse.json(classRoutines, { status: 200 });
  } catch (error) {
    console.error("Error fetching class routines:", error);
    return NextResponse.json(
      { error: "Failed to fetch class routines" },
      { status: 500 }
    );
  }
}

// POST create a new class routine
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      grade,
      section,
      term,
      imageUrl,
      pdfUrl,
      updatedDate,
      order = 0,
    } = body;

    // Validate required fields
    if (!grade || !section || !term || !imageUrl || !pdfUrl || !updatedDate) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Parse updatedDate as a Date object
    const parsedUpdatedDate = new Date(updatedDate);
    if (isNaN(parsedUpdatedDate.getTime())) {
      return NextResponse.json(
        { error: "Invalid updatedDate format" },
        { status: 400 }
      );
    }

    const classRoutine = await prisma.classRoutine.create({
      data: {
        grade,
        section,
        term,
        imageUrl,
        pdfUrl,
        updatedDate: parsedUpdatedDate,
        order: parseInt(order),
        isActive: true,
      },
    });

    return NextResponse.json(classRoutine, { status: 201 });
  } catch (error) {
    console.error("Error creating class routine:", error);
    return NextResponse.json(
      { error: "Failed to create class routine" },
      { status: 500 }
    );
  }
}
