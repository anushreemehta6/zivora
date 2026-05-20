import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { OrderStatus } from "@prisma/client";

export async function PATCH(
  req: Request,
  context: any
) {
  try {
    const body = await req.json();

    const { id: orderId } = await context.params;

    console.log("ORDER ID:", orderId);
    console.log("STATUS:", body.status);

    const updatedOrder = await prisma.order.update({
      where: {
        id: orderId,
      },

      data: {
        status: body.status as OrderStatus,
      },
    });

    return NextResponse.json(updatedOrder);

  } catch (error) {
    console.error("UPDATE ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to update order",
      },
      { status: 500 }
    );
  }
}