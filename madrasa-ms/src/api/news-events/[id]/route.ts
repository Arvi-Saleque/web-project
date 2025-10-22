import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = Promise<{ id: string }>;

// PUT - Update news/event
export async function PUT(request: Request, props: { params: Params }) {
  const params = await props.params;
  try {
    const { id } = params;
    const body = await request.json();

    const {
      title,
      category,
      date,
      time,
      description,
      imageUrl,
      author,
      tags,
      order,
      isActive,
    } = body;

    const newsEvent = await prisma.newsEvent.update({
      where: { id },
      data: {
        title,
        category,
        date: date ? new Date(date) : undefined,
        time,
        description,
        imageUrl,
        author,
        tags: tags || [],
        order,
        isActive,
      } as any,
    });

    return NextResponse.json(newsEvent);
  } catch (error) {
    console.error("Error updating news/event:", error);
    return NextResponse.json(
      { error: "Failed to update news/event" },
      { status: 500 }
    );
  }
}

// DELETE - Soft delete news/event
export async function DELETE(request: Request, props: { params: Params }) {
  const params = await props.params;
  try {
    const { id } = params;

    const newsEvent = await prisma.newsEvent.update({
      where: { id },
      data: { isActive: false },
    });

    return NextResponse.json(newsEvent);
  } catch (error) {
    console.error("Error deleting news/event:", error);
    return NextResponse.json(
      { error: "Failed to delete news/event" },
      { status: 500 }
    );
  }
}
