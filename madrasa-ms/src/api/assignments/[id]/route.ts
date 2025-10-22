import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// PUT - Update assignment
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    
    const updatedAssignment = await prisma.assignment.update({
      where: { id },
      data: {
        class: body.class,
        section: body.section,
        subject: body.subject,
        name: body.name,
        instructions: body.instructions,
        assignDate: new Date(body.assignDate),
        submissionDate: new Date(body.submissionDate),
        marks: parseInt(body.marks),
        priority: body.priority,
        order: body.order,
        isActive: body.isActive,
      },
    })
    
    return NextResponse.json(updatedAssignment)
  } catch (error) {
    console.error("Error updating assignment:", error)
    return NextResponse.json(
      { error: "Failed to update assignment" },
      { status: 500 }
    )
  }
}

// DELETE - Delete assignment
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    await prisma.assignment.delete({
      where: { id },
    })
    
    return NextResponse.json({ message: "Assignment deleted successfully" })
  } catch (error) {
    console.error("Error deleting assignment:", error)
    return NextResponse.json(
      { error: "Failed to delete assignment" },
      { status: 500 }
    )
  }
}
