
import { OrderStatus } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const body = await req.json();

    const updatedOrder = await prisma.order.update({
      where: {
        id,
      },

      data: {
        status: body.status,

        deliveredAt:
          body.status === "DELIVERED"
            ? new Date()
            : null,
      },
    });

    return NextResponse.json(updatedOrder);

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to update order" },
      { status: 500 }
    );
  }
}