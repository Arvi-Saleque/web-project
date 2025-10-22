import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Fetch all active teachers
export async function GET() {
  try {
    const teachers = await prisma.teacher.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    });

    return NextResponse.json(teachers);
  } catch (error) {
    console.error("Error fetching teachers:", error);
    return NextResponse.json(
      { error: "Failed to fetch teachers" },
      { status: 500 }
    );
  }
}

// POST - Create new teacher
export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Received teacher data:", body);

    const {
      name,
      position,
      qualification,
      experience,
      specialization,
      imageUrl,
      email,
      phone,
      category,
      achievements,
      bio,
      order,
      isActive,
    } = body;

    // Validate required fields
    if (
      !name ||
      !position ||
      !qualification ||
      !experience ||
      !specialization ||
      !imageUrl ||
      !email ||
      !category
    ) {
      return NextResponse.json(
        {
          error: "Missing required fields",
          details: "Name, position, qualification, experience, specialization, imageUrl, email, and category are required",
        },
        { status: 400 }
      );
    }

    console.log("Creating teacher with data:", { name, position, email });

    const teacher = await prisma.teacher.create({
      data: {
        name,
        position,
        qualification,
        experience,
        specialization,
        imageUrl,
        email,
        phone: phone || null,
        category,
        achievements: achievements || [],
        bio: bio || null,
        order: order || 0,
        isActive: isActive !== undefined ? isActive : true,
      } as any,
    });

    console.log("Created teacher successfully:", teacher.id);

    return NextResponse.json(teacher, { status: 201 });
  } catch (error) {
    console.error("Error creating teacher:", error);
    return NextResponse.json(
      {
        error: "Failed to create teacher",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
