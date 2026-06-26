import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";

// Check if admin is already initialized
export async function GET() {
  try {
    const adminExists = await prisma.user.findFirst({
      where: { role: "ADMIN" },
    });

    return NextResponse.json({
      initialized: !!adminExists,
    });
  } catch (error) {
    console.error("Admin check error:", error);
    return NextResponse.json(
      { error: "Failed to check admin status" },
      { status: 500 }
    );
  }
}

// Initialize first admin account from environment variables
export async function POST() {
  console.log("=== Admin Init POST Request Started ===");
  
  try {
    console.log("Checking for existing admin...");
    
    // Check if admin already exists
    const existingAdmin = await prisma.user.findFirst({
      where: { role: "ADMIN" },
    });
    
    console.log("Existing admin check result:", existingAdmin ? "Found" : "Not found");

    if (existingAdmin) {
      return NextResponse.json(
        { error: "Admin account already initialized" },
        { status: 400 }
      );
    }

    // Read admin credentials from environment variables
    const adminEmail = process.env.ORIGIN_ADMIN_EMAIL;
    const adminPassword = process.env.ORIGIN_ADMIN_PASSWORD;
    const adminName = process.env.ORIGIN_ADMIN_NAME || "Administrator";
    
    console.log("Environment variables:", {
      hasEmail: !!adminEmail,
      hasPassword: !!adminPassword,
      name: adminName
    });

    if (!adminEmail || !adminPassword) {
      return NextResponse.json(
        { error: "Admin credentials not configured in environment variables. Please set ORIGIN_ADMIN_EMAIL and ORIGIN_ADMIN_PASSWORD in .env file." },
        { status: 500 }
      );
    }

    // Validate password strength
    if (adminPassword.length < 8) {
      return NextResponse.json(
        { error: "Admin password in .env must be at least 8 characters" },
        { status: 500 }
      );
    }

    // Check if email is already taken
    console.log("Checking if email is already registered...");
    const existingUser = await prisma.user.findUnique({
      where: { email: adminEmail },
    });
    
    console.log("Email check result:", existingUser ? "Already exists" : "Available");

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered. Please use a different ORIGIN_ADMIN_EMAIL in .env" },
        { status: 400 }
      );
    }

    // Create admin user
    console.log("Creating admin user...");
    const hashedPassword = await hash(adminPassword, 12);
    console.log("Password hashed successfully");
    
    const admin = await prisma.user.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
        name: adminName,
        role: "ADMIN",
        isInitialAdmin: true,
        isEmailVerified: true, // Admin doesn't need email verification
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });
    
    console.log("Admin user created successfully:", admin.id);

    return NextResponse.json({
      message: "Admin account created successfully",
      admin,
      credentials: {
        email: adminEmail,
        password: adminPassword, // Send plain password for auto-login
      },
    });
  } catch (error) {
    console.error("Admin initialization error:", error);
    
    // Log detailed error for debugging
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
    
    return NextResponse.json(
      { 
        error: "Failed to create admin account",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

// Delete admin account and all related data
export async function DELETE() {
  try {
    // Find the admin account
    const admin = await prisma.user.findFirst({
      where: { role: "ADMIN" },
    });

    if (!admin) {
      return NextResponse.json(
        { error: "No admin account found" },
        { status: 404 }
      );
    }

    // Delete all admin-related data in a transaction
    await prisma.$transaction(async (tx) => {
      // Delete admin's notifications
      await tx.notification.deleteMany({
        where: { userId: admin.id },
      });

      // Delete admin's shipments and their tracking history
      const adminShipments = await tx.shipment.findMany({
        where: { userId: admin.id },
        select: { id: true },
      });

      for (const shipment of adminShipments) {
        await tx.trackingHistory.deleteMany({
          where: { shipmentId: shipment.id },
        });
      }

      await tx.shipment.deleteMany({
        where: { userId: admin.id },
      });

      // Delete the admin user
      await tx.user.delete({
        where: { id: admin.id },
      });
    });

    return NextResponse.json({
      message: "Admin account and all related data deleted successfully",
    });
  } catch (error) {
    console.error("Admin deletion error:", error);
    return NextResponse.json(
      { error: "Failed to delete admin account" },
      { status: 500 }
    );
  }
}
