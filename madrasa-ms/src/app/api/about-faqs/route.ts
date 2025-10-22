import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Fetch all about FAQs
export async function GET() {
  try {
    const aboutFAQs = await prisma.aboutFAQ.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    });

    return NextResponse.json(aboutFAQs);
  } catch (error) {
    console.error("Error fetching about FAQs:", error);
    return NextResponse.json(
      { error: "Failed to fetch about FAQs" },
      { status: 500 }
    );
  }
}

// POST - Create new about FAQ
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const newAboutFAQ = await prisma.aboutFAQ.create({
      data: {
        question: body.question,
        answer: body.answer,
        order: body.order || 0,
        isActive: true,
      },
    });

    return NextResponse.json(newAboutFAQ, { status: 201 });
  } catch (error) {
    console.error("Error creating about FAQ:", error);
    return NextResponse.json(
      { error: "Failed to create about FAQ" },
      { status: 500 }
    );
  }
}
