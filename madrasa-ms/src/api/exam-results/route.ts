import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all exam results
export async function GET() {
  try {
    const examResults = await prisma.examResult.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    });

    return NextResponse.json(examResults, { status: 200 });
  } catch (error) {
    console.error("Error fetching exam results:", error);
    return NextResponse.json(
      { error: "Failed to fetch exam results" },
      { status: 500 }
    );
  }
}

// POST create a new exam result
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      examName,
      grade,
      examType,
      publishedDate,
      imageUrl,
      pdfUrl,
      passPercentage,
      order = 0,
    } = body;

    // Validate required fields
    if (
      !examName ||
      !grade ||
      !examType ||
      !publishedDate ||
      !imageUrl ||
      !pdfUrl ||
      passPercentage === undefined
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Parse publishedDate as a Date object
    const parsedPublishedDate = new Date(publishedDate);
    if (isNaN(parsedPublishedDate.getTime())) {
      return NextResponse.json(
        { error: "Invalid publishedDate format" },
        { status: 400 }
      );
    }

    const examResult = await prisma.examResult.create({
      data: {
        examName,
        grade,
        examType,
        publishedDate: parsedPublishedDate,
        imageUrl,
        pdfUrl,
        status: "published",
        passPercentage: parseInt(passPercentage),
        order: parseInt(order),
        isActive: true,
      },
    });

    return NextResponse.json(examResult, { status: 201 });
  } catch (error) {
    console.error("Error creating exam result:", error);
    return NextResponse.json(
      { error: "Failed to create exam result" },
      { status: 500 }
    );
  }
}
