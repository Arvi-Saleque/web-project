import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// PUT - Update stat
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    
    const updatedStat = await prisma.homepageStat.update({
      where: { id },
      data: {
        label: body.label,
        value: body.value,
        order: body.order,
      },
    })
    
    return NextResponse.json(updatedStat)
  } catch (error) {
    console.error("Error updating stat:", error)
    return NextResponse.json(
      { error: "Failed to update stat" },
      { status: 500 }
    )
  }
}

// DELETE - Remove stat
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    await prisma.homepageStat.delete({
      where: { id },
    })
    
    return NextResponse.json({ message: "Stat deleted successfully" })
  } catch (error) {
    console.error("Error deleting stat:", error)
    return NextResponse.json(
      { error: "Failed to delete stat" },
      { status: 500 }
    )
  }
}
