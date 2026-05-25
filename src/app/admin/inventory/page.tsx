"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Package } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const Page = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedProduct, setEditedProduct] = useState<any>({});

  const handleSave = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: "PATCH",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(editedProduct),
      });

      const updated = await res.json();

      setProducts((prev) =>
        prev.map((p) => (p.id === id ? updated : p))
      );

      // IMPORTANT
      setEditedProduct(updated);

      setEditingId(null);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch("/api/admin/products");
        const data = await res.json();

        setProducts(data.products || []);

      } catch (error) {
        console.error(error);

      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  if (loading) {
    return (
      <div className="h-96 flex items-center justify-center font-bold text-primary animate-pulse">
        Syncing Product Data...
      </div>
    );
  }

  return (
    <div className="w-full px-6 py-8">
      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-secondary">
          Inventory Overview
        </h1>

        <p className="text-gray-400 mt-2 text-sm">
          Manage and monitor all products in your catalog.
        </p>
      </div>

      {/* PRODUCTS */}
      <div className="space-y-8">
        {products.map((product: any) => (
          <div
            key={product.id}
            className="w-full overflow-hidden bg-white border border-gray-100 rounded-[2rem] p-6 lg:p-8 shadow-sm hover:shadow-md transition-all duration-300"
          >
            {/* TOP BAR */}
            <div className="flex items-start justify-between gap-6 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shrink-0">
                  <Package size={22} />
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-secondary">
                    {product.name}
                  </h2>

                  <p className="text-sm text-gray-400 mt-1">
                    Added{" "}
                    {formatDistanceToNow(new Date(product.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-xs uppercase tracking-widest text-gray-400 font-bold">
                  Live Price
                </p>

                <p className="text-3xl font-bold text-secondary">
                  ₹
                  {Number(
                    product.dynamicPrice || product.price || 0
                  ).toLocaleString()}
                </p>
              </div>
            </div>

            {/* MAIN CONTENT */}
            <div className="grid grid-cols-1 xl:grid-cols-[240px_minmax(0,1fr)] gap-8 items-start">

              {/* IMAGE */}
              <div className="relative w-full max-w-[240px]">
                <Image
                  src={product.images?.[0]?.url || "/placeholder.png"}
                  alt={product.name}
                  width={240}
                  height={240}
                  className="w-full h-[240px] object-cover rounded-[1.5rem] border border-gray-100"
                />

                <div className="absolute top-4 left-4 bg-secondary text-white text-xs font-bold px-4 py-2 rounded-full">
                  {product.type}
                </div>
              </div>

              {/* RIGHT CONTENT */}
              <div className="space-y-6 min-w-0 w-full">
                {editingId === product.id ? (
                  <>
                    {/* NAME */}
                    <div>
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">
                        Product Name
                      </label>

                      <input
                        type="text"
                        value={editedProduct.name || ""}
                        onChange={(e) =>
                          setEditedProduct({
                            ...editedProduct,
                            name: e.target.value,
                          })
                        }
                        className="w-full h-14 px-5 rounded-2xl border border-gray-200 outline-none focus:border-primary"
                      />
                    </div>

                    {/* DESCRIPTION */}
                    <div>
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">
                        Description
                      </label>

                      <textarea
                        value={editedProduct.description || ""}
                        onChange={(e) =>
                          setEditedProduct({
                            ...editedProduct,
                            description: e.target.value,
                          })
                        }
                        className="w-full rounded-2xl border border-gray-200 p-5 min-h-[140px] max-h-[220px] resize-none outline-none focus:border-primary"
                      />
                    </div>

                    {/* GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4 w-full">

                      {/* LIVE PRICE DISPLAY */}
                      <div className="h-14 px-4 rounded-2xl border border-gray-100 bg-gray-50 flex items-center font-bold text-secondary">
                        ₹
                        {Number(
                          editedProduct.dynamicPrice ||
                          editedProduct.price ||
                          0
                        ).toLocaleString()}
                      </div>

                      {/* COMPARE PRICE */}
                      <input
                        type="number"
                        placeholder="Compare Price"
                        value={editedProduct.comparePrice || ""}
                        onChange={(e) =>
                          setEditedProduct({
                            ...editedProduct,
                            comparePrice: e.target.value,
                          })
                        }
                        className="h-14 px-4 rounded-2xl border border-gray-200 outline-none"
                      />

                      {/* TYPE */}
                      <select
                        value={editedProduct.type || ""}
                        onChange={(e) =>
                          setEditedProduct({
                            ...editedProduct,
                            type: e.target.value,
                          })
                        }
                        className="h-14 px-4 rounded-2xl border border-gray-200 outline-none"
                      >
                        <option value="GOLD">GOLD</option>
                        <option value="SILVER">SILVER</option>
                        <option value="DIAMOND">DIAMOND</option>
                        <option value="PLATINUM">PLATINUM</option>
                        <option value="GEMSTONE">GEMSTONE</option>
                      </select>

                      {/* PURITY */}
                      <input
                        type="text"
                        placeholder="Purity"
                        value={editedProduct.purity || ""}
                        onChange={(e) =>
                          setEditedProduct({
                            ...editedProduct,
                            purity: e.target.value,
                          })
                        }
                        className="h-14 px-4 rounded-2xl border border-gray-200 outline-none"
                      />

                      {/* MAKING CHARGES */}
                      <input
                        type="number"
                        placeholder="Making Charges"
                        value={editedProduct.makingCharges || ""}
                        onChange={(e) =>
                          setEditedProduct({
                            ...editedProduct,
                            makingCharges: e.target.value,
                          })
                        }
                        className="h-14 px-4 rounded-2xl border border-gray-200 outline-none"
                      />

                      {/* WEIGHT */}
                      <input
                        type="number"
                        placeholder="Weight"
                        value={editedProduct.weight || ""}
                        onChange={(e) =>
                          setEditedProduct({
                            ...editedProduct,
                            weight: e.target.value,
                          })
                        }
                        className="h-14 px-4 rounded-2xl border border-gray-200 outline-none"
                      />

                      {/* STONE PRICE */}
                      <input
                        type="number"
                        placeholder="Stone Price"
                        value={editedProduct.stonePrice || ""}
                        onChange={(e) =>
                          setEditedProduct({
                            ...editedProduct,
                            stonePrice: e.target.value,
                          })
                        }
                        className="h-14 px-4 rounded-2xl border border-gray-200 outline-none"
                      />

                      {/* SKU (READONLY) */}
                      <input
                        type="text"
                        value={editedProduct.sku || ""}
                        readOnly
                        className="h-14 px-4 rounded-2xl border border-gray-100 bg-gray-100 outline-none cursor-not-allowed"
                      />

                      {/* SLUG (READONLY) */}
                      <input
                        type="text"
                        value={editedProduct.slug || ""}
                        readOnly
                        className="h-14 px-4 rounded-2xl border border-gray-100 bg-gray-100 outline-none cursor-not-allowed"
                      />
                    </div>

                    {/* CHECKBOXES */}
                    <div className="flex flex-wrap items-center gap-8 pt-2">
                      <label className="flex items-center gap-3 text-sm font-medium">
                        <input
                          type="checkbox"
                          checked={editedProduct.isFeatured || false}
                          onChange={(e) =>
                            setEditedProduct({
                              ...editedProduct,
                              isFeatured: e.target.checked,
                            })
                          }
                        />
                        Featured Product
                      </label>

                      <label className="flex items-center gap-3 text-sm font-medium">
                        <input
                          type="checkbox"
                          checked={editedProduct.isActive || false}
                          onChange={(e) =>
                            setEditedProduct({
                              ...editedProduct,
                              isActive: e.target.checked,
                            })
                          }
                        />
                        Active Product
                      </label>
                    </div>

                    {/* TAGS */}
                    <div>
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">
                        Tags
                      </label>

                      <input
                        type="text"
                        placeholder="gold, jewellery, premium"
                        value={editedProduct.tags?.join(", ") || ""}
                        onChange={(e) =>
                          setEditedProduct({
                            ...editedProduct,
                            tags: e.target.value
                              .split(",")
                              .map((tag) => tag.trim()),
                          })
                        }
                        className="w-full h-14 px-5 rounded-2xl border border-gray-200 outline-none"
                      />
                    </div>

                    {/* BUTTONS */}
                    <div className="flex items-center gap-4 pt-4">
                      <button
                        onClick={() => handleSave(product.id)}
                        className="px-8 h-14 rounded-2xl bg-primary text-white font-bold hover:opacity-90 transition-all"
                      >
                        Save Changes
                      </button>

                      <button
                        onClick={() => {
                          setEditingId(null);
                          setEditedProduct({});
                        }}
                        className="px-8 h-14 rounded-2xl border border-gray-200 font-bold hover:bg-gray-50 transition-all"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-gray-500 leading-7 text-[15px] break-words">
                      {product.description}
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                      <div className="bg-gray-50 rounded-2xl p-4">
                        <p className="text-xs text-gray-400 uppercase font-bold">
                          SKU
                        </p>

                        <p className="font-bold mt-2">
                          {product.sku}
                        </p>
                      </div>

                      <div className="bg-gray-50 rounded-2xl p-4">
                        <p className="text-xs text-gray-400 uppercase font-bold">
                          Weight
                        </p>

                        <p className="font-bold mt-2">
                          {product.weight || 0}g
                        </p>
                      </div>

                      <div className="bg-gray-50 rounded-2xl p-4">
                        <p className="text-xs text-gray-400 uppercase font-bold">
                          Purity
                        </p>

                        <p className="font-bold mt-2">
                          {product.purity || "N/A"}
                        </p>
                      </div>

                      <div className="bg-gray-50 rounded-2xl p-4">
                        <p className="text-xs text-gray-400 uppercase font-bold">
                          Status
                        </p>

                        <p className="font-bold mt-2">
                          {product.isActive ? "Active" : "Inactive"}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setEditingId(product.id);

                        setEditedProduct({
                          ...product,
                        });
                      }}
                      className="mt-4 px-8 h-14 rounded-2xl bg-secondary text-white font-bold hover:opacity-90 transition-all"
                    >
                      Edit Product
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;