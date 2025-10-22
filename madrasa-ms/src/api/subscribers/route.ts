import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Fetch all active subscribers
export async function GET() {
  try {
    const subscribers = await prisma.subscriber.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
      select: { id: true, email: true, name: true, createdAt: true },
    });

    return NextResponse.json(subscribers);
  } catch (error) {
    console.error("Error fetching subscribers:", error);
    return NextResponse.json(
      { error: "Failed to fetch subscribers" },
      { status: 500 }
    );
  }
}

// POST - Subscribe a new email (idempotent)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name } = body || {};

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Idempotent subscribe: create or re-activate existing record
    const existing = await prisma.subscriber.findUnique({ where: { email } });

    if (existing) {
      const isReactivated = !existing.isActive || existing.unsubscribedAt !== null;
      const updated = await prisma.subscriber.update({
        where: { email },
        data: {
          name: name ?? existing.name ?? null,
          isActive: true,
          unsubscribedAt: null,
        },
      });
      return NextResponse.json(
        { ok: true, status: isReactivated ? "reactivated" : "already_active", subscriber: updated },
        { status: isReactivated ? 201 : 200 }
      );
    }

    const created = await prisma.subscriber.create({
      data: {
        email,
        name: name ?? null,
        isActive: true,
      },
    });

    return NextResponse.json({ ok: true, subscriber: created }, { status: 201 });
  } catch (error) {
    console.error("Error subscribing:", error);
    return NextResponse.json(
      { error: "Failed to subscribe" },
      { status: 500 }
    );
  }
}