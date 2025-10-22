import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

// PUT - Update contact submission (mark as read, add response, etc.)
export async function PUT(
  request: NextRequest,
  props: RouteParams
) {
  try {
    const params = await props.params;
    const { id } = params;
    const data = await request.json();

    console.log("Updating contact submission:", id);

    const submission = await (prisma as any).contactSubmission.update({
      where: { id },
      data: {
        status: data.status || undefined,
        response: data.response || undefined,
        respondedAt: data.response ? new Date() : undefined,
        respondedBy: data.respondedBy || undefined,
      } as any,
    });

    console.log("Contact submission updated successfully");
    return NextResponse.json(submission);
  } catch (error) {
    console.error("Error updating contact submission:", error);
    return NextResponse.json(
      { error: "Failed to update contact submission", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

// DELETE - Delete contact submission
export async function DELETE(
  request: NextRequest,
  props: RouteParams
) {
  try {
    const params = await props.params;
    const { id } = params;

    console.log("Deleting contact submission:", id);

    await (prisma as any).contactSubmission.delete({
      where: { id },
    });

    console.log("Contact submission deleted successfully");
    return NextResponse.json({ message: "Contact submission deleted successfully" });
  } catch (error) {
    console.error("Error deleting contact submission:", error);
    return NextResponse.json(
      { error: "Failed to delete contact submission", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
