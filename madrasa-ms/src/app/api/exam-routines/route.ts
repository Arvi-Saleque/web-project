import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET - Fetch all exam routines
export async function GET() {
  try {
    const examRoutines = await prisma.examRoutine.findMany({
      orderBy: { order: 'asc' },
    })

    return NextResponse.json(examRoutines)
  } catch (error) {
    console.error("Error fetching exam routines:", error)
    console.error("Error details:", error instanceof Error ? error.message : String(error))
    return NextResponse.json(
      { error: "Failed to fetch exam routines", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    )
  }
}

// POST - Create new exam routine
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const newExamRoutine = await prisma.examRoutine.create({
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
        order: body.order || 0,
        isActive: true,
      },
    })
    
    return NextResponse.json(newExamRoutine, { status: 201 })
  } catch (error) {
    console.error("Error creating exam routine:", error)
    return NextResponse.json(
      { error: "Failed to create exam routine" },
      { status: 500 }
    )
  }
}
