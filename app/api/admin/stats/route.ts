import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || (session.user as any).role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized. Admin access required." },
        { status: 403 }
      );
    }

    // Fetch admin statistics
    const [
      totalUsers,
      totalShipments,
      pendingShipments,
      totalNotifications,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.shipment.count(),
      prisma.shipment.count({ where: { status: "pending" } }),
      prisma.notification.count(),
    ]);

    return NextResponse.json({
      totalUsers,
      totalShipments,
      pendingShipments,
      totalNotifications,
    });
  } catch (error) {
    console.error("Admin stats error:", error);
    return NextResponse.json(
      { error: "Failed to fetch admin statistics" },
      { status: 500 }
    );
  }
}
