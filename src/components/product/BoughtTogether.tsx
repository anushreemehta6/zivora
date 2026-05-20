"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, ShoppingBag, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Button from "../ui/Button";

type ProductImage = {
  url: string;
};

type BundleItem = {
  id: string;
  name: string;
  slug: string;
  price: number;
  dynamicPrice?: number;
  purity?: string;
  type: string;
  images: ProductImage[];
};

type Props = {
  product: any;
};

export default function BoughtTogether({ product }: Props) {
  const { addToCart } = useCart();
  const [bundleProducts, setBundleProducts] = useState<BundleItem[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [addedToCart, setAddedToCart] = useState(false);

  // Active product details
  const activeProductPrice = product.dynamicPrice || product.price || 0;
  const activeProductItem: BundleItem = {
    id: product.id,
    name: product.name,
    slug: product.slug,
    price: product.price,
    dynamicPrice: activeProductPrice,
    purity: product.purity,
    type: product.type,
    images: product.images || [],
  };

  useEffect(() => {
    async function fetchBundleSuggestions() {
      try {
        setLoading(true);
        let items: BundleItem[] = [];

        // 1. Try to fetch products from the same collection/occasion
        if (product.collection?.slug) {
          const res = await fetch(
            `/api/products?occasion=${encodeURIComponent(product.collection.slug)}&excludeId=${product.id}&limit=3`
          );
          if (res.ok) {
            items = await res.json();
          }
        }

        // 2. Fallback: Fetch by other active items to create a bundle (e.g. Ring + Earring + Necklace)
        if (items.length < 2) {
          const res = await fetch(`/api/products?excludeId=${product.id}&limit=4`);
          if (res.ok) {
            const generalItems = await res.json();
            const existingIds = new Set(items.map((i) => i.id));
            generalItems.forEach((item: BundleItem) => {
              if (!existingIds.has(item.id) && items.length < 2) {
                items.push(item);
              }
            });
          }
        }

        setBundleProducts(items);
        // By default, select all suggested bundle items
        setSelectedIds(items.map((item) => item.id));
      } catch (error) {
        console.error("Failed to fetch bundle suggestions:", error);
      } finally {
        setLoading(false);
      }
    }

    if (product?.id) {
      fetchBundleSuggestions();
    }
  }, [product]);

  if (loading) {
    return (
      <div className="mt-24 border-t border-gray-100 pt-16 animate-pulse">
        <div className="h-6 bg-gray-100 rounded w-1/4 mb-4" />
        <div className="h-10 bg-gray-100 rounded w-1/3 mb-10" />
        <div className="h-64 bg-gray-50 rounded-[2.5rem] w-full" />
      </div>
    );
  }

  // If there are no suggested products to bundle with, we don't show the section
  if (bundleProducts.length === 0) {
    return null;
  }

  const allBundleItems = [activeProductItem, ...bundleProducts];

  const handleToggleSelect = (id: string) => {
    // Cannot deselect the active product
    if (id === product.id) return;

    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Calculate live total price of selected bundle items
  const totalPrice =
    activeProductPrice +
    bundleProducts
      .filter((item) => selectedIds.includes(item.id))
      .reduce((sum, item) => sum + (item.dynamicPrice || item.price || 0), 0);

  const handleAddBundleToCart = () => {
    // 1. Add active product
    addToCart({
      id: `${product.id}-default`,
      productId: product.id,
      name: product.name,
      price: activeProductPrice,
      image: product.images?.[0]?.url || "",
      quantity: 1,
      variantName: "Standard",
    });

    // 2. Add other checked items
    bundleProducts
      .filter((item) => selectedIds.includes(item.id))
      .forEach((item) => {
        addToCart({
          id: `${item.id}-default`,
          productId: item.id,
          name: item.name,
          price: item.dynamicPrice || item.price || 0,
          image: item.images?.[0]?.url || "",
          quantity: 1,
          variantName: "Standard",
        });
      });

    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 3000);
  };

  return (
    <div className="mt-14 border-t border-gray-100 pt-10">
      <div className="group mb-12">
        <span className="text-primary font-bold text-xs uppercase tracking-widest block mb-1">
          Complete the Look
        </span>
        <h2 className="text-3xl font-bold text-secondary uppercase tracking-tight">
          Frequently Bought Together
        </h2>
        <div className="h-1 w-20 bg-primary rounded-full group-hover:w-40 transition-all duration-500 mt-2" />
      </div>

      <div className="bg-background-soft rounded-[2.5rem] p-6 sm:p-8 md:p-12 border border-primary/10 flex flex-col lg:flex-row gap-10 items-center justify-between">
        {/* Left Section: Visual Items Chain */}
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 flex-grow w-full lg:w-auto">
          {allBundleItems.map((item, index) => {
            const isSelected = index === 0 || selectedIds.includes(item.id);
            const isMain = index === 0;
            const finalPrice = item.dynamicPrice || item.price || 0;

            return (
              <React.Fragment key={item.id}>
                {index > 0 && (
                  <div className="flex items-center justify-center p-3 rounded-full bg-white border border-gray-100 shadow-sm text-primary transition-transform duration-300">
                    <Plus size={18} strokeWidth={2.5} />
                  </div>
                )}

                <div
                  onClick={() => handleToggleSelect(item.id)}
                  className={`relative flex flex-col items-center bg-white rounded-2xl p-4 border transition-all duration-300 w-full md:w-52 cursor-pointer shadow-sm hover:shadow-md hover:-translate-y-1 ${
                    isSelected ? "border-primary/40 ring-1 ring-primary/10" : "border-gray-100 opacity-65"
                  }`}
                >
                  {/* Custom checkbox */}
                  <div className="absolute top-4 left-4 z-10">
                    <div
                      className={`w-5 h-5 rounded flex items-center justify-center transition-all ${
                        isMain
                          ? "bg-primary text-white cursor-not-allowed"
                          : isSelected
                          ? "bg-primary text-white border-primary"
                          : "border border-gray-300 hover:border-primary"
                      }`}
                    >
                      {isSelected && <Check size={14} strokeWidth={3} />}
                    </div>
                  </div>

                  <div className="relative w-28 sm:w-32 aspect-[4/5] rounded-xl overflow-hidden bg-gray-50 mb-3 mt-4">
                    {item.images?.[0]?.url ? (
                      <Image
                        src={item.images[0].url}
                        alt={item.name}
                        fill
                        sizes="(max-width: 640px) 100px, 150px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-200">
                        <ShoppingBag size={24} />
                      </div>
                    )}
                  </div>

                  <span className="text-[9px] font-bold text-primary uppercase tracking-widest mb-1">
                    {isMain ? "Current Piece" : "Match Option"}
                  </span>
                  <h4 className="text-sm font-bold text-secondary line-clamp-1 text-center max-w-full px-2 uppercase tracking-tight">
                    {item.name}
                  </h4>
                  <span className="text-sm font-extrabold text-secondary mt-1.5">
                    ₹{finalPrice.toLocaleString()}
                  </span>
                </div>
              </React.Fragment>
            );
          })}
        </div>

        {/* Right Section: Total Price & CTA */}
        <div className="w-full lg:w-80 bg-white rounded-[2rem] p-6 sm:p-8 border border-gray-100 shadow-sm flex flex-col justify-between self-stretch">
          <div>
            <h4 className="font-bold text-secondary uppercase text-xs tracking-widest mb-4">
              Bundle Summary
            </h4>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-sm text-gray-500 font-medium">
                <span>Selected Items:</span>
                <span className="text-secondary font-bold">
                  {1 + selectedIds.length}
                </span>
              </div>
              <div className="h-px bg-gray-50" />
              <div className="flex justify-between items-baseline">
                <span className="text-sm text-gray-500 font-bold uppercase tracking-wider">
                  Total Price:
                </span>
                <span className="text-2xl font-black text-secondary">
                  ₹{totalPrice.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <Button
            variant="gold"
            onClick={handleAddBundleToCart}
            className="w-full py-4 text-sm font-bold shadow-lg shadow-primary/10 tracking-widest uppercase flex items-center justify-center gap-2"
          >
            {addedToCart ? "Added to Cart!" : "Add Bundle to Cart"}
          </Button>
        </div>
      </div>
    </div>
  );
}
