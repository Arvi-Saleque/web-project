import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

// PUT - Update contact information
export async function PUT(
  request: NextRequest,
  props: RouteParams
) {
  try {
    const params = await props.params;
    const { id } = params;
    const data = await request.json();

    console.log("Updating contact info:", id);

    const contactInfo = await (prisma as any).contactInfo.update({
      where: { id },
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
      } as any,
    });

    console.log("Contact info updated successfully");
    return NextResponse.json(contactInfo);
  } catch (error) {
    console.error("Error updating contact info:", error);
    return NextResponse.json(
      { error: "Failed to update contact information", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

// DELETE - Soft delete contact information
export async function DELETE(
  request: NextRequest,
  props: RouteParams
) {
  try {
    const params = await props.params;
    const { id } = params;

    console.log("Deleting contact info:", id);

    await (prisma as any).contactInfo.update({
      where: { id },
      data: { isActive: false },
    });

    console.log("Contact info deleted successfully");
    return NextResponse.json({ message: "Contact information deleted successfully" });
  } catch (error) {
    console.error("Error deleting contact info:", error);
    return NextResponse.json(
      { error: "Failed to delete contact information", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
