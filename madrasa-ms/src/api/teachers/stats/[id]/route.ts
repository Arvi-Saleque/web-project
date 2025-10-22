import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = Promise<{ id: string }>;

// PUT - Update teacher stat
export async function PUT(request: Request, props: { params: Params }) {
  const params = await props.params;
  try {
    const { id } = params;
    const body = await request.json();

    const { icon, value, label, order, isActive } = body;

    const stat = await prisma.teacherStats.update({
      where: { id },
      data: {
        icon,
        value,
        label,
        order,
        isActive,
      } as any,
    });

    return NextResponse.json(stat);
  } catch (error) {
    console.error("Error updating teacher stat:", error);
    return NextResponse.json(
      { error: "Failed to update teacher stat" },
      { status: 500 }
    );
  }
}

// DELETE - Soft delete teacher stat
export async function DELETE(request: Request, props: { params: Params }) {
  const params = await props.params;
  try {
    const { id } = params;

    const stat = await prisma.teacherStats.update({
      where: { id },
      data: { isActive: false },
    });

    return NextResponse.json(stat);
  } catch (error) {
    console.error("Error deleting teacher stat:", error);
    return NextResponse.json(
      { error: "Failed to delete teacher stat" },
      { status: 500 }
    );
  }
}
