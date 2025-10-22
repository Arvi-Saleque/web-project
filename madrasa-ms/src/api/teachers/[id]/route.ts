import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = Promise<{ id: string }>;

// PUT - Update teacher
export async function PUT(request: Request, props: { params: Params }) {
  const params = await props.params;
  try {
    const { id } = params;
    const body = await request.json();

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

    const teacher = await prisma.teacher.update({
      where: { id },
      data: {
        name,
        position,
        qualification,
        experience,
        specialization,
        imageUrl,
        email,
        phone,
        category,
        achievements: achievements || [],
        bio,
        order,
        isActive,
      } as any,
    });

    return NextResponse.json(teacher);
  } catch (error) {
    console.error("Error updating teacher:", error);
    return NextResponse.json(
      { error: "Failed to update teacher" },
      { status: 500 }
    );
  }
}

// DELETE - Soft delete teacher
export async function DELETE(request: Request, props: { params: Params }) {
  const params = await props.params;
  try {
    const { id } = params;

    const teacher = await prisma.teacher.update({
      where: { id },
      data: { isActive: false },
    });

    return NextResponse.json(teacher);
  } catch (error) {
    console.error("Error deleting teacher:", error);
    return NextResponse.json(
      { error: "Failed to delete teacher" },
      { status: 500 }
    );
  }
}
