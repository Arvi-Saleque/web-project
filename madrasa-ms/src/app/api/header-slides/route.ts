import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET - Fetch all slides
export async function GET() {
  try {
    const slides = await prisma.headerSlide.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    })

    // If no slides exist, return default slides
    if (slides.length === 0) {
      const defaultSlides = [
        {
          id: "1",
          image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=2070",
          title: "Welcome to Our Madrasa",
          subtitle: "Building Knowledge, Nurturing Faith",
          description: "Excellence in Islamic education with modern teaching methods",
          primaryButton: "Enroll Now",
          secondaryButton: "Learn More",
          order: 0,
        },
        {
          id: "2",
          image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022",
          title: "Quality Islamic Education",
          subtitle: "Empowering Future Scholars",
          description: "Comprehensive curriculum combining traditional and contemporary learning",
          primaryButton: "View Programs",
          secondaryButton: "Contact Us",
          order: 1,
        },
        {
          id: "3",
          image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2032",
          title: "Join Our Community",
          subtitle: "Where Learning Meets Purpose",
          description: "Experienced teachers dedicated to your child's spiritual and academic growth",
          primaryButton: "Get Started",
          secondaryButton: "Our Faculty",
          order: 2,
        },
      ]
      return NextResponse.json(defaultSlides)
    }

    return NextResponse.json(slides)
  } catch (error) {
    console.error("Error fetching slides:", error)
    return NextResponse.json(
      { error: "Failed to fetch slides" },
      { status: 500 }
    )
  }
}

// POST - Create new slide
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Get the highest order number
    const maxOrderSlide = await prisma.headerSlide.findFirst({
      orderBy: { order: 'desc' },
    })
    
    const newSlide = await prisma.headerSlide.create({
      data: {
        image: body.image,
        title: body.title,
        subtitle: body.subtitle,
        description: body.description,
        primaryButton: body.primaryButton,
        secondaryButton: body.secondaryButton,
        order: maxOrderSlide ? maxOrderSlide.order + 1 : 0,
        isActive: true,
      },
    })
    
    return NextResponse.json(newSlide, { status: 201 })
  } catch (error) {
    console.error("Error creating slide:", error)
    return NextResponse.json(
      { error: "Failed to create slide" },
      { status: 500 }
    )
  }
}
