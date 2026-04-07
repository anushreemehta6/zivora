import Link from "next/link"
import Image from "next/image"
import { Star, ShoppingBag } from "lucide-react"

async function getProducts() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(
    `${baseUrl}/api/admin/products`,
    { cache: "no-store" }
  )

  if (!res.ok) throw new Error("Failed to fetch products")
  const data = await res.json();
  return data.slice(0,8);
}

export default async function Products() {
  const products = await getProducts()

  return (
    <section className="max-w-7xl mx-auto px-8 py-12">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-2">Featured Collection</h2>
          <div className="h-1 w-20 bg-primary rounded-full" />
        </div>
        <Link href="/products" className="text-gray-500 hover:text-primary transition-colors font-medium">
          Explore All
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {products.map((product: any) => (
          <Link
            key={product.id}
            href={`/product/${product.slug}`}
            className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
          >
            {/* Image Container */}
            <div className="relative aspect-[4/5] overflow-hidden bg-gray-50">
              {product.images?.[0]?.url ? (
                <Image
                  src={product.images[0].url}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300">
                  <ShoppingBag size={48} />
                </div>
              )}
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isFeatured && (
                  <span className="bg-primary text-white text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded-sm shadow-sm">
                    Featured
                  </span>
                )}
                <span className="bg-white/90 backdrop-blur-sm text-secondary text-[10px] uppercase font-bold px-2 py-1 rounded-sm shadow-sm border border-gray-100">
                  {product.purity} {product.type}
                </span>
              </div>

              {/* Quick Add Overlay */}
              <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <button className="w-full bg-secondary text-white hover:bg-primary py-3 rounded-xl font-bold text-sm shadow-xl flex items-center justify-center gap-2 hover:bg-black transition-colors">
                  <ShoppingBag size={18} />
                  Add to Cart
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">
                  {product.category?.name || "Jewelry"}
                </span>
                <div className="flex items-center gap-1 text-primary">
                  <Star size={12} fill="currentColor" />
                  <span className="text-xs font-bold">4.8</span>
                </div>
              </div>
              
              <h3 className="text-lg font-bold text-secondary mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                {product.name}
              </h3>
              
              <div className="mt-auto flex items-center gap-3">
                <p className="text-xl font-bold text-secondary">
                  ₹{(product.dynamicPrice || product.price || 0).toLocaleString()}
                </p>
                {product.comparePrice && (
                  <p className="text-sm text-gray-400 line-through">
                    ₹{product.comparePrice.toLocaleString()}
                  </p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
