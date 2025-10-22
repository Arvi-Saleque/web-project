import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Fetch all contact submissions
export async function GET() {
  try {
    console.log("Fetching contact submissions...");
    
    const submissions = await (prisma as any).contactSubmission.findMany({
      orderBy: { createdAt: "desc" },
    });

    console.log(`Retrieved ${submissions.length} contact submissions`);
    return NextResponse.json(submissions);
  } catch (error) {
    console.error("Error fetching contact submissions:", error);
    return NextResponse.json(
      { error: "Failed to fetch contact submissions", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

// POST - Create new contact submission (from contact form)
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    console.log("Received contact form submission:", { name: data.name, email: data.email });

    // Validate required fields
    if (!data.name || !data.email || !data.subject || !data.message) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, subject, and message are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    console.log("Creating new contact submission...");
    const submission = await (prisma as any).contactSubmission.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        subject: data.subject,
        message: data.message,
        status: "new",
      } as any,
    });

    console.log("Contact submission created successfully:", submission.id);
    return NextResponse.json(submission, { status: 201 });
  } catch (error) {
    console.error("Error creating contact submission:", error);
    return NextResponse.json(
      { error: "Failed to submit contact form", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
