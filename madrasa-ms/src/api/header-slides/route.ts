import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET - Fetch all slides
export async function GET() {
  try {
    const slides = await prisma.headerSlide.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    })

    // If no slides exist, seed defaults into the database then return them
    if (slides.length === 0) {
      const defaultSlidesData = [
        {
          image: "https://drive.google.com/file/d/1fTkvSB04-J5pyZKZFIOChIrmuI0spRnM/view?usp=drive_link",
          title: "Welcome to Our Madrasa",
          subtitle: "Building Knowledge, Nurturing Faith",
          description: "Excellence in Islamic education with modern teaching methods",
          primaryButton: "Enroll Now",
          secondaryButton: "Learn More",
          order: 0,
          isActive: true,
        },
        {
          image: "https://drive.google.com/file/d/10bPP_Avb0M3KCI1oBMvytXYVfe82W80m/view?usp=drive_link",
          title: "Quality Islamic Education",
          subtitle: "Empowering Future Scholars",
          description: "Comprehensive curriculum combining traditional and contemporary learning",
          primaryButton: "View Programs",
          secondaryButton: "Contact Us",
          order: 1,
          isActive: true,
        },
        {
          image: "https://drive.google.com/file/d/1Pk4YGeBt4h_rqdWvknZD8Abh985Yv_7c/view?usp=drive_link",
          title: "Join Our Community",
          subtitle: "Where Learning Meets Purpose",
          description: "Experienced teachers dedicated to your child's spiritual and academic growth",
          primaryButton: "Get Started",
          secondaryButton: "Our Faculty",
          order: 2,
          isActive: true,
        },
      ]

      await prisma.headerSlide.createMany({ data: defaultSlidesData })

      const seededSlides = await prisma.headerSlide.findMany({
        where: { isActive: true },
        orderBy: { order: 'asc' },
      })
      return NextResponse.json(seededSlides)
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
