import Link from "next/link"
import Image from "next/image"
import { Filter, ChevronDown, ShoppingBag, Star } from "lucide-react"

import WishlistToggle from "@/components/product/WishlistToggle"

async function getProducts(searchParams: any) {

  const { category, sort, minPrice, maxPrice } = await searchParams;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  
  // Build query string
  const query = new URLSearchParams();
  if (category) query.append("category", category);
  if (sort) query.append("sort", sort);
  if (minPrice) query.append("minPrice", minPrice);
  if (maxPrice) query.append("maxPrice", maxPrice);

  const res = await fetch(
    `${baseUrl}/api/products?${query.toString()}`,
    { cache: "no-store" }
  )

  if (!res.ok) throw new Error("Failed to fetch products")

  return res.json()
}

export default async function ProductsPage({ searchParams }: { searchParams: any }) {
  const products = await getProducts(searchParams)
  const { category } = await searchParams;

  return (
    <div className="max-w-7xl mx-auto px-8 py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-bold text-secondary mb-2">
            {category ? `${category.charAt(0).toUpperCase() + category.slice(1)} Collection` : "All Jewelry"}
          </h1>
          <p className="text-gray-500 font-medium">Discover your perfect piece of elegance</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative group">
            <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-xl font-bold text-sm text-secondary hover:border-primary transition-colors transition-all active:scale-95">
              Sort By <ChevronDown size={16} />
            </button>
            <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
              <Link href="/products?sort=newest" className="block px-4 py-2 text-sm hover:bg-gray-50 hover:text-primary">Newest First</Link>
              <Link href="/products?sort=price-asc" className="block px-4 py-2 text-sm hover:bg-gray-50 hover:text-primary">Price: Low to High</Link>
              <Link href="/products?sort=price-desc" className="block px-4 py-2 text-sm hover:bg-gray-50 hover:text-primary">Price: High to Low</Link>
              <Link href="/products?sort=trending" className="block px-4 py-2 text-sm hover:bg-gray-50 hover:text-primary">Trending</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 flex-shrink-0 space-y-10">
          <div>
            <h3 className="text-lg font-bold text-secondary mb-6 flex items-center gap-2">
              <Filter size={18} className="text-primary" />
              Filters
            </h3>
            
            <div className="space-y-8">
              {/* Category Filter */}
              <div>
                <h4 className="font-bold text-sm uppercase tracking-wider text-gray-400 mb-4">Category</h4>
                <div className="space-y-3">
                  {["Rings", "Earrings", "Necklaces", "Bracelets", "Pendants"].map((cat) => (
                    <Link 
                      key={cat} 
                      href={`/products?category=${cat.toLowerCase()}`}
                      className={`block text-sm font-medium transition-colors hover:text-primary ${category === cat.toLowerCase() ? "text-primary font-bold" : "text-gray-600"}`}
                    >
                      {cat}
                    </Link>
                  ))}
                  <Link href="/products" className="block text-sm font-medium text-gray-400 hover:text-primary">Clear All</Link>
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <h4 className="font-bold text-sm uppercase tracking-wider text-gray-400 mb-4">Price Range</h4>
                <div className="space-y-3">
                  <Link href="/products?maxPrice=5000" className="block text-sm font-medium text-gray-600 hover:text-primary">Under ₹5,000</Link>
                  <Link href="/products?minPrice=5000&maxPrice=15000" className="block text-sm font-medium text-gray-600 hover:text-primary">₹5,000 - ₹15,000</Link>
                  <Link href="/products?minPrice=15000&maxPrice=30000" className="block text-sm font-medium text-gray-600 hover:text-primary">₹15,000 - ₹30,000</Link>
                  <Link href="/products?minPrice=30000" className="block text-sm font-medium text-gray-600 hover:text-primary">Above ₹30,000</Link>
                </div>
              </div>

              {/* Metal Type */}
              <div>
                <h4 className="font-bold text-sm uppercase tracking-wider text-gray-400 mb-4">Metal</h4>
                <div className="flex flex-wrap gap-2">
                  {["Silver", "Gold", "Rose Gold", "Platinum"].map((metal) => (
                    <button key={metal} className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-bold text-gray-600 hover:border-primary hover:text-primary transition-all active:scale-95">
                      {metal}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Promo Box */}
          <div className="bg-background-soft rounded-2xl p-6 border border-primary/10">
            <h4 className="font-bold text-secondary mb-2">Need Custom Jewelry?</h4>
            <p className="text-xs text-gray-500 mb-4 leading-relaxed text-balance">Get a unique piece designed just for you by our expert craftsmen.</p>
            <Link href="/custom-order" className="text-xs font-bold text-primary hover:underline">Request Design</Link>
          </div>
        </aside>

        {/* Product Grid */}
        <main className="flex-grow">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.length > 0 ? (
              products.map((product: any) => (
                <Link
                  key={product.id}
                  href={`/product/${product.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-gray-50">
                    {product.images?.[0]?.url ? (
                      <Image
                        src={product.images[0].url}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-200">
                        <ShoppingBag size={48} />
                      </div>
                    )}
                    <div className="absolute top-4 right-4 z-10">
                      <WishlistToggle 
                        product={{
                          id: product.id,
                          productId: product.id,
                          name: product.name,
                          price: product.dynamicPrice || 0,
                          image: product.images?.[0]?.url || ""
                        }} 
                      />
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 backdrop-blur-sm text-[10px] font-bold text-secondary px-2 py-1 rounded shadow-sm border border-gray-100 uppercase tracking-widest">
                        {product.purity} {product.type}
                      </span>
                    </div>

                  </div>
                  
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{product.category?.name || "Jewelry"}</span>
                      <div className="flex items-center gap-1 text-primary">
                        <Star size={10} fill="currentColor" />
                        <span className="text-[10px] font-bold">4.9</span>
                      </div>
                    </div>
                    <h2 className="text-lg font-bold text-secondary group-hover:text-primary transition-colors line-clamp-1 mb-2">{product.name}</h2>
                    <div className="flex items-center gap-3">
                      <p className="text-xl font-bold text-secondary">₹{product.dynamicPrice?.toLocaleString()}</p>
                      {product.comparePrice && (
                        <p className="text-sm text-gray-400 line-through">₹{product.comparePrice.toLocaleString()}</p>
                      )}
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full py-20 text-center">
                <div className="inline-flex p-6 rounded-full bg-gray-50 text-gray-300 mb-4">
                  <ShoppingBag size={48} />
                </div>
                <h3 className="text-xl font-bold text-secondary">No products found</h3>
                <p className="text-gray-500">Try adjusting your filters or search terms.</p>
                <Link href="/products" className="inline-block mt-6 text-primary font-bold hover:underline">Clear all filters</Link>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
