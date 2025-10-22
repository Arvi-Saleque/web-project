import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// PUT - Update exam routine
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    
    const updatedExamRoutine = await prisma.examRoutine.update({
      where: { id },
      data: {
        examName: body.examName,
        grade: body.grade,
        examType: body.examType,
        startDate: new Date(body.startDate),
        endDate: new Date(body.endDate),
        imageUrl: body.imageUrl,
        pdfUrl: body.pdfUrl,
        status: body.status,
        totalDays: parseInt(body.totalDays),
        order: body.order,
        isActive: body.isActive,
      },
    })
    
    return NextResponse.json(updatedExamRoutine)
  } catch (error) {
    console.error("Error updating exam routine:", error)
    return NextResponse.json(
      { error: "Failed to update exam routine" },
      { status: 500 }
    )
  }
}

// DELETE - Delete exam routine
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    await prisma.examRoutine.delete({
      where: { id },
    })
    
    return NextResponse.json({ message: "Exam routine deleted successfully" })
  } catch (error) {
    console.error("Error deleting exam routine:", error)
    return NextResponse.json(
      { error: "Failed to delete exam routine" },
      { status: 500 }
    )
  }
}
