import Image from "next/image";
import { Star, ShieldCheck, Truck, RefreshCcw, Heart, Info } from "lucide-react";
import ProductActions from "@/components/product/ProductActions";
import ProductTabs from "@/components/product/ProductTabs";
import ProductGallery from "@/components/product/ProductGallery";
import ProductMetaActions from "@/components/product/ProductMetaActions";
import ProductDescription from "@/components/product/ProductDescription";
import RecentlyViewedTracker from "@/components/product/RecentlyViewedTracker";
import BoughtTogether from "@/components/product/BoughtTogether";
import SimilarProducts from "@/components/product/SimilarProducts";
import RecentlyViewed from "@/components/product/RecentlyViewed";
async function getProduct(slug: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/products/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch product");

  return res.json();
}

export default async function Product({ params }: any) {
  const { slug } = await params;
  const product = await getProduct(slug);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20">
      <RecentlyViewedTracker slug={slug} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        {/* Left: Image Gallery */}
        <ProductGallery
          images={product.images || []}
          productName={product.name}
          productId={product.id}
          price={product.dynamicPrice || product.price || 0}
        />

        {/* Right: Product Info */}
        <div className="flex flex-col">
          {/* Breadcrumbs Placeholder */}
          <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">
            <span>Home</span>
            <span>/</span>
            <span>{product.type} Jewelry</span>
            <span>/</span>
            <span className="text-primary">
              {product.category?.name || "Product"}
            </span>
          </div>

          <h1 className="text-4xl lg:text-5xl font-bold text-secondary mb-4 leading-tight">
            {product.name}
          </h1>

          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center gap-1 text-primary">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  fill={
                    i < (product.averageRating || 4.8) ? "currentColor" : "none"
                  }
                />
              ))}
              <span className="ml-2 text-sm font-bold text-secondary">
                {product.averageRating || 4.8} ({product.reviewCount || 0}{" "}
                reviews)
              </span>
            </div>
            <div className="h-4 w-px bg-gray-200" />
            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">
              In Stock
            </span>
          </div>

          <div className="flex items-baseline gap-4 mb-10">
            <span className="text-4xl font-bold text-secondary">
              ₹{(product.dynamicPrice || product.price || 0).toLocaleString()}
            </span>
            {product.comparePrice && (
              <span className="text-xl text-gray-400 line-through">
                ₹{product.comparePrice.toLocaleString()}
              </span>
            )}
            <span className="text-xs font-bold text-primary uppercase tracking-widest">
              Inclusive of all taxes
            </span>
            <span>
              <button className="text-primary text-xs hover:underline flex items-center gap-1">
                <Info size={20} /> Size Guide
              </button>
            </span>
          </div>

          <ProductDescription description={product.description} />

          <ProductActions product={product} />

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-4 p-6 bg-background-soft rounded-2xl border border-gray-100 mb-10">
            <div className="flex flex-col items-center text-center gap-2">
              <ShieldCheck className="text-primary" size={24} />
              <span className="text-[10px] font-bold text-secondary uppercase">
                Certified
              </span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <Truck className="text-primary" size={24} />
              <span className="text-[10px] font-bold text-secondary uppercase">
                Fast Ship
              </span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <RefreshCcw className="text-primary" size={24} />
              <span className="text-[10px] font-bold text-secondary uppercase">
                Easy Return
              </span>
            </div>
          </div>

          <ProductMetaActions productName={product.name} productSlug={slug} />
        </div>
      </div>

      {/* Interactive Tabs / Detailed Info */}
      <ProductTabs product={product} />

      {/* Bought Together Set Builder */}
      <BoughtTogether product={product} />

      {/* Similar Products Grid */}
      <SimilarProducts 
        categoryId={product.categoryId} 
        categorySlug={product.category?.slug || ""} 
        excludeId={product.id} 
      />

      {/* Recently Viewed Carousel */}
      <RecentlyViewed currentSlug={slug} />
    </div>
  );
}
