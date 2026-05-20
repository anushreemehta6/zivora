"use client";

import React, { useEffect, useState } from "react";
import { Package, ArrowUpRight } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";

const orderStatuses = [
  "PENDING",
  "CONFIRMED",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
  "RETURNED",
];

const Page = () => {
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // ONLY ONE CARD EXPANDS
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const handleStatusChange = async (
    orderId: string,
    status: string
  ) => {
    try {
      await fetch(`/api/admin/orders/${orderId}`, {
        method: "PATCH",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ status }),
      });

      setRecentOrders((prev) =>
        prev.map((order) =>
          order.id === orderId
            ? { ...order, status }
            : order
        )
      );

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await fetch("/api/admin/orders");
        const data = await res.json();

        setRecentOrders(data);

      } catch (error) {
        console.error(error);

      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="h-96 flex items-center justify-center font-bold text-primary animate-pulse">
        Syncing Dashboard Data...
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 text-secondary">
        <div className="xl:col-span-2 bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8">

          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold">
              All Orders
            </h3>
          </div>

          <div className="space-y-6">

            {recentOrders.map((order: any) => {

              const isExpanded = expandedOrder === order.id;

              return (
                <div
                  key={order.id}
                  className="flex flex-col gap-4 p-4 hover:bg-gray-50 rounded-2xl transition-all duration-300 border border-transparent hover:border-gray-200"
                >

                  {/* TOP SECTION */}
                  <div className="flex items-center gap-4 w-full">

                    {/* ICON */}
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shrink-0">
                      <Package size={20} />
                    </div>

                    {/* ORDER INFO */}
                    <div className="grow">
                      <p className="font-bold text-sm">
                        New order from {order.user?.name || "Customer"}
                      </p>

                      <p className="text-xs text-gray-400">
                        #{order.id.slice(0, 8)} •{" "}
                        {formatDistanceToNow(
                          new Date(order.createdAt),
                          {
                            addSuffix: true,
                          }
                        )}
                      </p>
                    </div>

                    {/* RIGHT SECTION */}
                    <div className="ml-auto flex items-center gap-4">

                      <p className="font-bold text-lg">
                        ₹{Number(order.finalAmount).toLocaleString()}
                      </p>

                      <button
                        onClick={() =>
                          setExpandedOrder(
                            isExpanded ? null : order.id
                          )
                        }
                        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                      >
                        <ArrowUpRight
                          size={18}
                          className={`text-blue-950 transition-all duration-300 ${
                            isExpanded
                              ? "rotate-180"
                              : "rotate-0"
                          }`}
                        />
                      </button>

                    </div>
                  </div>

                  {/* EXPANDED SECTION */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isExpanded
                        ? "max-h-[500px] opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >

                    <div className="pt-4 border-t border-gray-100">

                      {order.items.map((item: any) => (

                        <div
                          key={item.id}
                          className="flex gap-6"
                        >

                          {/* PRODUCT IMAGE */}
                          <Image
                            src={
                              item.product.images[0]?.url
                            }
                            alt={item.product.name}
                            width={180}
                            height={180}
                            className="rounded-2xl object-cover border border-gray-100"
                          />

                          {/* PRODUCT INFO */}
                          <div className="flex flex-col gap-4 flex-1">

                            <div>
                              <h2 className="font-bold text-xl">
                                {item.product.name}
                              </h2>

                              <p className="text-gray-500 mt-2">
                                {item.product.description}
                              </p>
                            </div>

                            <div className="flex items-center gap-6 text-sm">

                              <p>
                                Quantity:
                                <span className="font-bold ml-2">
                                  {item.quantity}
                                </span>
                              </p>

                              <p>
                                Product Price:
                                <span className="font-bold ml-2">
                                  ₹{Number(item.price).toLocaleString()}
                                </span>
                              </p>

                            </div>

                            {/* STATUS */}
                            <div className="pt-2">

                              <select
                                value={order.status}
                                onChange={(e) =>
                                  handleStatusChange(
                                    order.id,
                                    e.target.value
                                  )
                                }
                                className={`px-4 py-2 rounded-xl text-sm font-bold outline-none border transition-all ${
                                  order.status === "DELIVERED"
                                    ? "bg-green-100 text-green-700 border-green-200"
                                    : order.status === "CANCELLED"
                                    ? "bg-red-100 text-red-700 border-red-200"
                                    : order.status === "SHIPPED"
                                    ? "bg-blue-100 text-blue-700 border-blue-200"
                                    : "bg-gray-100 text-gray-700 border-gray-200"
                                }`}
                              >

                                {orderStatuses.map((status) => (
                                  <option
                                    key={status}
                                    value={status}
                                  >
                                    {status}
                                  </option>
                                ))}

                              </select>

                            </div>

                          </div>
                        </div>

                      ))}

                    </div>

                  </div>

                </div>
              );
            })}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;