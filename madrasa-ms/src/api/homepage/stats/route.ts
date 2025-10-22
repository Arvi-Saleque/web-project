import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET - Fetch all stats
export async function GET() {
  try {
    const stats = await prisma.homepageStat.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    })

    return NextResponse.json(stats)
  } catch (error) {
    console.error("Error fetching stats:", error)
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    )
  }
}

// POST - Create new stat
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const newStat = await prisma.homepageStat.create({
      data: {
        label: body.label,
        value: body.value,
        order: body.order || 0,
        isActive: true,
      },
    })
    
    return NextResponse.json(newStat, { status: 201 })
  } catch (error) {
    console.error("Error creating stat:", error)
    return NextResponse.json(
      { error: "Failed to create stat" },
      { status: 500 }
    )
  }
}
