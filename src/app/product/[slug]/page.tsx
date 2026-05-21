import Image from "next/image";
import {
  Star,
  ShieldCheck,
  Truck,
  RefreshCcw,
  Heart,
  Info,
} from "lucide-react";
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
  const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL ||
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");
 const res = await fetch(`${baseUrl}/api/products/${slug}`, {
  next: { revalidate: 60 },
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
        <main className="flex flex-col">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex flex-wrap items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              <li>
                <a href="/" className="hover:text-primary transition-colors">
                  Home
                </a>
              </li>
              <li>/</li>
              <li>
                <span className="hover:text-primary transition-colors">
                  {product.type} Jewelry
                </span>
              </li>
              <li>/</li>
              <li aria-current="page" className="text-primary font-extrabold">
                {product.category?.name || "Product"}
              </li>
            </ol>
          </nav>

          <h1 className="text-4xl lg:text-5xl font-playfair font-bold text-secondary mb-3 leading-tight tracking-tight">
            {product.name}
          </h1>

          <div
            className="flex flex-wrap items-center gap-4 mb-4"
            aria-label={`Rated ${product.averageRating || 4.8} out of 5 stars with ${product.reviewCount || 0} reviews`}
          >
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
            <div
  className={`px-4 py-2 rounded-full text-xs font-bold ${
    product.isActive
      ? "bg-green-100 text-green-700"
      : "bg-red-100 text-red-700"
  }`}
>
  {product.isActive ? "In Stock" : "Out of Stock"}
</div>
          </div>

          <div className="flex flex-wrap items-center gap-4 mb-6 w-full">
            <span className="text-4xl font-extrabold text-secondary tracking-tight">
              ₹{(product.dynamicPrice || product.price || 0).toLocaleString()}
            </span>
            {product.comparePrice && (
              <span className="text-xl text-gray-400 line-through">
                ₹{product.comparePrice.toLocaleString()}
              </span>
            )}
            <span className="text-[10px] font-bold text-primary uppercase tracking-widest bg-primary/5 px-2 py-1 rounded border border-primary/10">
              Inclusive of all taxes
            </span>
            <button
              className="text-primary hover:text-secondary text-xs hover:underline flex items-center gap-1.5 font-bold uppercase tracking-wider transition-colors ml-auto"
              aria-label="View Size Guide"
            >
              <Info size={14} /> Size Guide
            </button>
          </div>

          <ProductDescription description={product.description} />

          <ProductActions product={product} />

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-3 p-5 bg-gradient-to-br from-gray-50/80 via-white/50 to-gray-50/30 rounded-3xl border border-gray-100/80 shadow-sm mb-6 transition-all duration-500 hover:shadow-md hover:border-primary/10">
            <div className="flex flex-col items-center text-center gap-1.5 group p-2">
              <div className="p-2.5 rounded-full bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 scale-95 group-hover:scale-100 shadow-sm">
                <ShieldCheck size={20} />
              </div>
              <span className="text-[10px] font-bold text-secondary uppercase tracking-wider">
                Certified
              </span>
              <span className="text-[8px] text-gray-400 font-bold uppercase tracking-widest hidden sm:block">
                BIS Hallmarked
              </span>
            </div>
            <div className="flex flex-col items-center text-center gap-1.5 group p-2">
              <div className="p-2.5 rounded-full bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 scale-95 group-hover:scale-100 shadow-sm">
                <Truck size={20} />
              </div>
              <span className="text-[10px] font-bold text-secondary uppercase tracking-wider">
                Fast Ship
              </span>
              <span className="text-[8px] text-gray-400 font-bold uppercase tracking-widest hidden sm:block">
                Insured Courier
              </span>
            </div>
            <div className="flex flex-col items-center text-center gap-1.5 group p-2">
              <div className="p-2.5 rounded-full bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 scale-95 group-hover:scale-100 shadow-sm">
                <RefreshCcw size={20} />
              </div>
              <span className="text-[10px] font-bold text-secondary uppercase tracking-wider">
                Easy Return
              </span>
              <span className="text-[8px] text-gray-400 font-bold uppercase tracking-widest hidden sm:block">
                7-Day Insured
              </span>
            </div>
          </div>

          <ProductMetaActions productName={product.name} productSlug={slug} />
        </main>
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
