import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET - Fetch all assignments
export async function GET() {
  try {
    const assignments = await prisma.assignment.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    })

    return NextResponse.json(assignments)
  } catch (error) {
    console.error("Error fetching assignments:", error)
    return NextResponse.json(
      { error: "Failed to fetch assignments" },
      { status: 500 }
    )
  }
}

// POST - Create new assignment
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const newAssignment = await prisma.assignment.create({
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
        order: body.order || 0,
        isActive: true,
      },
    })
    
    return NextResponse.json(newAssignment, { status: 201 })
  } catch (error) {
    console.error("Error creating assignment:", error)
    return NextResponse.json(
      { error: "Failed to create assignment" },
      { status: 500 }
    )
  }
}
