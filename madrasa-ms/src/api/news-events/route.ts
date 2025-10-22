import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendNewsEventBroadcast } from "@/lib/email";

// GET - Fetch all active news and events
export async function GET() {
  try {
    const newsEvents = await prisma.newsEvent.findMany({
      where: { isActive: true },
      orderBy: [
        { date: "desc" },
        { order: "asc" },
      ],
    });

    return NextResponse.json(newsEvents);
  } catch (error) {
    console.error("Error fetching news & events:", error);
    return NextResponse.json(
      { error: "Failed to fetch news & events" },
      { status: 500 }
    );
  }
}

// POST - Create new news/event
export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Received news/event data:", body);

    const {
      title,
      category,
      date,
      time,
      description,
      imageUrl,
      author,
      tags,
      order,
      isActive,
    } = body;

    // Validate required fields
    if (
      !title ||
      !category ||
      !date ||
      !description ||
      !imageUrl ||
      !author
    ) {
      return NextResponse.json(
        {
          error: "Missing required fields",
          details: "Title, category, date, description, imageUrl, and author are required",
        },
        { status: 400 }
      );
    }

    console.log("Creating news/event with data:", { title, category, date });

    const newsEvent = await prisma.newsEvent.create({
      data: {
        title,
        category,
        date: new Date(date),
        time: time || null,
        description,
        imageUrl,
        author,
        tags: tags || [],
        order: order || 0,
        isActive: isActive !== undefined ? isActive : true,
      } as any,
    });

    console.log("Created news/event successfully:", newsEvent.id);

    // Notify subscribers via email (best-effort)
    try {
      let recipients: string[] = [];
      try {
        const list = await (prisma as any).subscriber.findMany({
          where: { isActive: true },
          select: { email: true },
        });
        recipients = (list || []).map((s: any) => s.email).filter(Boolean);
      } catch {
        const rows = await (prisma as any).$queryRawUnsafe(
          'SELECT "email" FROM "Subscriber" WHERE "isActive" = TRUE'
        );
        recipients = Array.isArray(rows)
          ? rows.map((r: any) => r.email).filter(Boolean)
          : [];
      }

      if (recipients.length > 0) {
        const result = await sendNewsEventBroadcast(
          {
            title: newsEvent.title,
            category: newsEvent.category,
            description: newsEvent.description,
            date: newsEvent.date,
            time: newsEvent.time,
            imageUrl: newsEvent.imageUrl,
            author: newsEvent.author,
            url: process.env.NEXT_PUBLIC_SITE_URL
              ? `${process.env.NEXT_PUBLIC_SITE_URL}/news-events`
              : undefined,
          },
          recipients
        );
        console.log("Broadcast send result:", result);
      } else {
        console.log("No subscribers to notify.");
      }
    } catch (notifyErr) {
      console.error("Failed to notify subscribers:", notifyErr);
    }

    return NextResponse.json(newsEvent, { status: 201 });
  } catch (error) {
    console.error("Error creating news/event:", error);
    return NextResponse.json(
      {
        error: "Failed to create news/event",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
