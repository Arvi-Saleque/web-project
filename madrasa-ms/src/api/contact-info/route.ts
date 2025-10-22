import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Fetch contact information
export async function GET() {
  try {
    console.log("Fetching contact information...");
    
    const contactInfo = await (prisma as any).contactInfo.findFirst({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
    });

    console.log("Contact info retrieved:", contactInfo ? "Found" : "Not found");
    
    if (!contactInfo) {
      // Return default structure if no contact info exists
      return NextResponse.json({
        phoneNumbers: ["+880 1234-567890", "+880 1234-567891"],
        emails: ["info@madrasa.edu", "admission@madrasa.edu"],
        addresses: ["123 Education Street", "Dhaka, Bangladesh"],
        workingHours: ["Sunday - Thursday: 8:00 AM - 4:00 PM", "Friday - Saturday: Closed"],
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.9009593164417!2d90.39169831498181!3d23.750891084588743!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2sDhaka%2C%20Bangladesh!5e0!3m2!1sen!2s!4v1633384839234!5m2!1sen!2s",
        officeSchedule: [
          { days: "Sunday - Thursday", hours: "8:00 AM - 4:00 PM", type: "open" },
          { days: "Friday - Saturday", hours: "Closed", type: "closed" }
        ],
        officeNote: "For urgent matters outside office hours, please email us and we'll respond as soon as possible.",
        quickTips: [
          "Check our FAQ section for common questions",
          "Provide detailed information in your message",
          "We typically respond within 24 hours",
          "For admission queries, visit the Admission page"
        ]
      });
    }

    return NextResponse.json(contactInfo);
  } catch (error) {
    console.error("Error fetching contact info:", error);
    return NextResponse.json(
      { error: "Failed to fetch contact information", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

// POST - Create new contact information
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    console.log("Received contact info data:", data);

    // Validate required fields
    if (!data.phoneNumbers || !data.emails || !data.addresses || !data.workingHours) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Deactivate existing contact info
    await (prisma as any).contactInfo.updateMany({
      where: { isActive: true },
      data: { isActive: false },
    });

    console.log("Creating new contact info...");
    const contactInfo = await (prisma as any).contactInfo.create({
      data: {
        phoneNumbers: data.phoneNumbers,
        emails: data.emails,
        addresses: data.addresses,
        workingHours: data.workingHours,
        mapUrl: data.mapUrl || null,
        mapLatitude: data.mapLatitude || null,
        mapLongitude: data.mapLongitude || null,
        officeSchedule: data.officeSchedule || [],
        officeNote: data.officeNote || null,
        quickTips: data.quickTips || [],
        isActive: true,
      } as any,
    });

    console.log("Contact info created successfully:", contactInfo.id);
    return NextResponse.json(contactInfo, { status: 201 });
  } catch (error) {
    console.error("Error creating contact info:", error);
    return NextResponse.json(
      { error: "Failed to create contact information", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
