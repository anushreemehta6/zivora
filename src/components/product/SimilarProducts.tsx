"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShoppingBag,
  Star,
  ArrowRight,
} from "lucide-react";

import WishlistToggle from "./WishlistToggle";

type ProductImage = {
  url: string;
};

type Category = {
  name: string;
  slug: string;
};

type SimilarProduct = {
  id: string;
  name: string;
  slug: string;

  price: number;
  dynamicPrice?: number;

  comparePrice?: number;

  purity?: string;

  type: string;

  images: ProductImage[];

  category?: Category;
};

type Props = {
  categoryId: string;
  categorySlug: string;
  excludeId: string;
};

export default function SimilarProducts({
  categoryId,
  categorySlug,
  excludeId,
}: Props) {

  const [products, setProducts] = useState<
    SimilarProduct[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    async function fetchSimilar() {

      try {
        setLoading(true);

        let data: SimilarProduct[] = [];

        //////////////////////////////////////////////////
        // CATEGORY PRODUCTS
        //////////////////////////////////////////////////

        if (categorySlug) {

          const url =
            `/api/products?category=${encodeURIComponent(
              categorySlug
            )}&excludeId=${excludeId}&limit=4`;

          const res = await fetch(url);

          if (res.ok) {

            const json =
              await res.json();

            data =
              json.products || [];
          }
        }

        //////////////////////////////////////////////////
        // FALLBACK PRODUCTS
        //////////////////////////////////////////////////

        if (data.length < 4) {

          const fallbackRes =
            await fetch(
              `/api/products?excludeId=${excludeId}&limit=8`
            );

          if (fallbackRes.ok) {

            const fallbackJson =
              await fallbackRes.json();

            const fallbackData =
              fallbackJson.products || [];

            const existingIds =
              new Set(
                data.map((p) => p.id)
              );

            for (const item of fallbackData) {

              if (
                !existingIds.has(item.id) &&
                data.length < 4
              ) {
                data.push(item);
              }
            }
          }
        }

        setProducts(data);

      } catch (error) {

        console.error(
          "Failed to fetch similar products:",
          error
        );

      } finally {

        setLoading(false);
      }
    }

    if (excludeId) {
      fetchSimilar();
    }

  }, [categorySlug, excludeId]);

  //////////////////////////////////////////////////////
  // LOADING
  //////////////////////////////////////////////////////

  if (loading) {
    return (
      <div className="mt-14 border-t border-gray-100 pt-10">

        <div className="flex justify-between items-end mb-12">

          <div>
            <span className="text-primary font-bold text-xs uppercase tracking-widest block mb-2">
              Curated for You
            </span>

            <h2 className="text-3xl font-bold text-secondary uppercase tracking-tight">
              Similar Masterpieces
            </h2>

            <div className="h-1 w-20 bg-primary rounded-full mt-2" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

          {[...Array(4)].map((_, i) => (

            <div
              key={i}
              className="animate-pulse space-y-4 bg-white p-4 border border-gray-50 rounded-2xl"
            >

              <div className="bg-gray-100 rounded-2xl aspect-[4/5] w-full" />

              <div className="h-4 bg-gray-100 rounded w-1/3" />

              <div className="h-6 bg-gray-100 rounded w-3/4" />

              <div className="h-5 bg-gray-100 rounded w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  //////////////////////////////////////////////////////
  // EMPTY STATE
  //////////////////////////////////////////////////////

  if (products.length === 0) {
    return null;
  }

  //////////////////////////////////////////////////////
  // MAIN UI
  //////////////////////////////////////////////////////

  return (
    <div className="mt-14 border-t border-gray-100 pt-10">

      {/* HEADER */}

      <div className="flex flex-col sm:flex-row justify-between sm:items-end mb-12 gap-6">

        <div className="group">

          <span className="text-primary font-bold text-xs uppercase tracking-widest block mb-1">
            Curated for You
          </span>

          <h2 className="text-3xl font-bold text-secondary uppercase tracking-tight">
            Similar Masterpieces
          </h2>

          <div className="h-1 w-20 bg-primary rounded-full group-hover:w-40 transition-all duration-500 mt-2" />
        </div>

        {categorySlug && (

          <Link
            href={`/products/${categorySlug}`}
            className="text-sm font-bold text-gray-400 hover:text-primary transition-colors flex items-center gap-2 uppercase tracking-widest self-start sm:self-auto"
          >

            Explore Collection

            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        )}
      </div>

      {/* PRODUCTS GRID */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

        {products.map((product) => {

          const finalPrice =
            product.dynamicPrice || product.price || 0;

          return (

            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >

              {/* IMAGE */}

              <div className="relative aspect-[4/5] overflow-hidden bg-gray-50 w-full">

                {product.images?.[0]?.url ? (

                  <Image
                    src={product.images[0].url}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                ) : (

                  <div className="w-full h-full flex items-center justify-center text-gray-200">

                    <ShoppingBag size={48} />
                  </div>
                )}

                {/* WISHLIST */}

                <div
                  className="absolute top-4 right-4 z-10"
                  onClick={(e) =>
                    e.stopPropagation()
                  }
                >

                  <WishlistToggle
                    product={{
                      id: product.id,
                      productId: product.id,

                      name: product.name,

                      price: finalPrice,

                      image:
                        product.images?.[0]?.url ||
                        "",
                    }}
                  />
                </div>

                {/* TYPE BADGE */}

                <div className="absolute top-4 left-4">

                  <span className="bg-white/90 backdrop-blur-sm text-secondary text-[10px] uppercase font-bold px-2 py-1 rounded-sm shadow-sm border border-gray-100">

                    {product.purity
                      ? `${product.purity} `
                      : ""}

                    {product.type}
                  </span>
                </div>
              </div>

              {/* CONTENT */}

              <div className="p-5 flex flex-col flex-grow justify-between">

                <div>

                  <div className="flex justify-between items-start mb-2">

                    <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">

                      {product.category?.name ||
                        "Jewelry"}
                    </span>

                    <div className="flex items-center gap-1 text-primary">

                      <Star
                        size={12}
                        fill="currentColor"
                      />

                      <span className="text-xs font-bold">
                        4.8
                      </span>
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-secondary mb-2 line-clamp-1 group-hover:text-primary transition-colors uppercase tracking-tight">

                    {product.name}
                  </h3>
                </div>

                {/* PRICE */}

                <div className="mt-4 flex items-center gap-3">

                  <p className="text-lg font-bold text-secondary">

                    ₹
                    {finalPrice.toLocaleString()}
                  </p>

                  {product.comparePrice && (

                    <p className="text-sm text-gray-400 line-through">

                      ₹
                      {product.comparePrice.toLocaleString()}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}