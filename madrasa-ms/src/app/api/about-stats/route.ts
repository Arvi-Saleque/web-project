import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Fetch all about stats
export async function GET() {
  try {
    const aboutStats = await prisma.aboutStat.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    });

    return NextResponse.json(aboutStats);
  } catch (error) {
    console.error("Error fetching about stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch about stats" },
      { status: 500 }
    );
  }
}

// POST - Create new about stat
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const newAboutStat = await prisma.aboutStat.create({
      data: {
        label: body.label,
        value: body.value,
        icon: body.icon,
        color: body.color,
        order: body.order || 0,
        isActive: true,
      },
    });

    return NextResponse.json(newAboutStat, { status: 201 });
  } catch (error) {
    console.error("Error creating about stat:", error);
    return NextResponse.json(
      { error: "Failed to create about stat" },
      { status: 500 }
    );
  }
}
