import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Fetch all about values
export async function GET() {
  try {
    const aboutValues = await prisma.aboutValue.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    });

    return NextResponse.json(aboutValues);
  } catch (error) {
    console.error("Error fetching about values:", error);
    return NextResponse.json(
      { error: "Failed to fetch about values" },
      { status: 500 }
    );
  }
}

// POST - Create new about value
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const newAboutValue = await prisma.aboutValue.create({
      data: {
        title: body.title,
        description: body.description,
        icon: body.icon,
        order: body.order || 0,
        isActive: true,
      },
    });

    return NextResponse.json(newAboutValue, { status: 201 });
  } catch (error) {
    console.error("Error creating about value:", error);
    return NextResponse.json(
      { error: "Failed to create about value" },
      { status: 500 }
    );
  }
}
