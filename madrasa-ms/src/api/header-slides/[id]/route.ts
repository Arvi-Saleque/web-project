import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// PUT - Update slide
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json()
    const { id } = await params
    
    const updatedSlide = await prisma.headerSlide.update({
      where: { id },
      data: {
        image: body.image,
        title: body.title,
        subtitle: body.subtitle,
        description: body.description,
        primaryButton: body.primaryButton,
        secondaryButton: body.secondaryButton,
      },
    })
    
    return NextResponse.json(updatedSlide)
  } catch (error) {
    console.error("Error updating slide:", error)
    return NextResponse.json(
      { error: "Failed to update slide" },
      { status: 500 }
    )
  }
}

// DELETE - Remove slide
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    await prisma.headerSlide.delete({
      where: { id },
    })
    
    return NextResponse.json(
      { message: "Slide deleted successfully", id },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error deleting slide:", error)
    return NextResponse.json(
      { error: "Failed to delete slide" },
      { status: 500 }
    )
  }
}
