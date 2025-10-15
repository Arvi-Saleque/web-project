import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET - Fetch all features
export async function GET() {
  try {
    const features = await prisma.homepageFeature.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    })

    return NextResponse.json(features)
  } catch (error) {
    console.error("Error fetching features:", error)
    return NextResponse.json(
      { error: "Failed to fetch features" },
      { status: 500 }
    )
  }
}

// POST - Create new feature
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const newFeature = await prisma.homepageFeature.create({
      data: {
        title: body.title,
        description: body.description,
        icon: body.icon,
        iconColor: body.iconColor,
        order: body.order || 0,
        isActive: true,
      },
    })
    
    return NextResponse.json(newFeature, { status: 201 })
  } catch (error) {
    console.error("Error creating feature:", error)
    return NextResponse.json(
      { error: "Failed to create feature" },
      { status: 500 }
    )
  }
}
