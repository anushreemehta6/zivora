import Image from "next/image"
import { Star, ShieldCheck, Truck, RefreshCcw, Heart, Share2, Info } from "lucide-react"
import ProductActions from "@/components/product/ProductActions"
import ProductTabs from "@/components/product/ProductTabs"

async function getProduct(slug: string) {

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(
    `${baseUrl}/api/products/${slug}`,
    { cache: "no-store" }
  )

  if (!res.ok) throw new Error("Failed to fetch product")

  return res.json()
}

export default async function Product({ params }: any) {
  const { slug } = await params
  const product = await getProduct(slug)

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        
        {/* Left: Image Gallery */}
        <div className="space-y-6">
          <div className="relative aspect-square overflow-hidden rounded-3xl bg-gray-50 border border-gray-100 group">
            {product.images?.[0]?.url && (
              <Image
                src={product.images[0].url}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
            )}
            <button className="absolute top-6 right-6 p-3 rounded-full bg-white/80 backdrop-blur shadow-sm hover:bg-white transition-colors text-gray-400 hover:text-red-500">
              <Heart size={20} />
            </button>
          </div>
          
          {/* Thumbnails (placeholder for multiple images) */}
          <div className="grid grid-cols-4 gap-4">
            {product.images?.map((img: any, idx: number) => (
              <div key={idx} className="aspect-square rounded-xl overflow-hidden border-2 border-primary bg-gray-50 cursor-pointer">
                <Image src={img.url} alt={product.name} width={150} height={150} className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="flex flex-col">
          {/* Breadcrumbs Placeholder */}
          <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">
            <span>Home</span>
            <span>/</span>
            <span>{product.type} Jewelry</span>
            <span>/</span>
            <span className="text-primary">{product.category?.name || "Product"}</span>
          </div>

          <h1 className="text-4xl lg:text-5xl font-bold text-secondary mb-4 leading-tight">
            {product.name}
          </h1>

          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center gap-1 text-primary">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill={i < (product.averageRating || 4.8) ? "currentColor" : "none"} />
              ))}
              <span className="ml-2 text-sm font-bold text-secondary">{product.averageRating || 4.8} ({product.reviewCount || 0} reviews)</span>
            </div>
            <div className="h-4 w-px bg-gray-200" />
            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">In Stock</span>
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
          </div>

          <p className="text-gray-600 leading-relaxed mb-10 text-lg">
            {product.description}
          </p>

          <ProductActions product={product} />


          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-4 p-6 bg-background-soft rounded-2xl border border-gray-100 mb-10">
            <div className="flex flex-col items-center text-center gap-2">
              <ShieldCheck className="text-primary" size={24} />
              <span className="text-[10px] font-bold text-secondary uppercase">Certified</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <Truck className="text-primary" size={24} />
              <span className="text-[10px] font-bold text-secondary uppercase">Fast Ship</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <RefreshCcw className="text-primary" size={24} />
              <span className="text-[10px] font-bold text-secondary uppercase">Easy Return</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-secondary group">
              <Share2 size={18} className="group-hover:text-primary transition-colors" /> Share
            </button>
            <button className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-secondary group">
              <Info size={18} className="group-hover:text-primary transition-colors" /> Ask a Question
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Tabs / Detailed Info */}
      <ProductTabs product={product} />
    </div>
  )
}