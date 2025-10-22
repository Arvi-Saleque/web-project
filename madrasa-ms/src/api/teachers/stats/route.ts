import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Fetch all active teacher stats
export async function GET() {
  try {
    const stats = await prisma.teacherStats.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    });

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Error fetching teacher stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch teacher stats" },
      { status: 500 }
    );
  }
}

// POST - Create new teacher stat
export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Received teacher stat data:", body);

    const { icon, value, label, order, isActive } = body;

    // Validate required fields
    if (!icon || !value || !label) {
      return NextResponse.json(
        {
          error: "Missing required fields",
          details: "Icon, value, and label are required",
        },
        { status: 400 }
      );
    }

    const stat = await prisma.teacherStats.create({
      data: {
        icon,
        value,
        label,
        order: order || 0,
        isActive: isActive !== undefined ? isActive : true,
      } as any,
    });

    console.log("Created teacher stat successfully:", stat.id);

    return NextResponse.json(stat, { status: 201 });
  } catch (error) {
    console.error("Error creating teacher stat:", error);
    return NextResponse.json(
      {
        error: "Failed to create teacher stat",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
