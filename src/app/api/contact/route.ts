import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const contactMessage = await prisma.contactMessage.create({
      data: {
        name,
        email,
        subject,
        message,
      },
    });

    return NextResponse.json(
      { message: "Contact message saved successfully", data: contactMessage },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving contact message:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
