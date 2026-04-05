import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const [totalOrders, totalSales, totalUsers, totalProducts] = await Promise.all([
      prisma.order.count(),
      prisma.order.aggregate({ _sum: { finalAmount: true } }),
      prisma.user.count(),
      prisma.product.count(),
    ]);

    // Get monthly sales for the chart
    const last6Months = Array.from({ length: 6 }).map((_, i) => {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      return {
        month: d.toLocaleString("default", { month: "short" }),
        year: d.getFullYear(),
        start: new Date(d.getFullYear(), d.getMonth(), 1),
        end: new Date(d.getFullYear(), d.getMonth() + 1, 0),
      };
    }).reverse();

    const monthlySales = await Promise.all(last6Months.map(async (m) => {
      const sales = await prisma.order.aggregate({
        where: {
          createdAt: {
            gte: m.start,
            lte: m.end,
          }
        },
        _sum: { finalAmount: true }
      });
      return {
        name: m.month,
        value: sales._sum.finalAmount || 0
      };
    }));

    return NextResponse.json({
      stats: {
        orders: totalOrders,
        sales: totalSales._sum.finalAmount || 0,
        users: totalUsers,
        products: totalProducts,
      },
      chartData: monthlySales
    });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 });
  }
}
