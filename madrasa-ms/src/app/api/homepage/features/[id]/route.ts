import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// PUT - Update feature
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    
    const updatedFeature = await prisma.homepageFeature.update({
      where: { id },
      data: {
        title: body.title,
        description: body.description,
        icon: body.icon,
        iconColor: body.iconColor,
        order: body.order,
      },
    })
    
    return NextResponse.json(updatedFeature)
  } catch (error) {
    console.error("Error updating feature:", error)
    return NextResponse.json(
      { error: "Failed to update feature" },
      { status: 500 }
    )
  }
}

// DELETE - Remove feature
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    await prisma.homepageFeature.delete({
      where: { id },
    })
    
    return NextResponse.json({ message: "Feature deleted successfully" })
  } catch (error) {
    console.error("Error deleting feature:", error)
    return NextResponse.json(
      { error: "Failed to delete feature" },
      { status: 500 }
    )
  }
}
