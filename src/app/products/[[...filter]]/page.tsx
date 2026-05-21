import Link from "next/link"
import Image from "next/image"
import { Filter, ChevronDown, ShoppingBag, Star } from "lucide-react"

import WishlistToggle from "@/components/product/WishlistToggle"
import NameFilterInput from "@/components/product/NameFilterInput"

async function getProducts(filters: any) {
  const { category, occasion, bond, tag, minPrice, maxPrice, sort, search } = filters;
 const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL ||
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");
  
  const query = new URLSearchParams();
  if (category) query.append("category", category);
  if (occasion) query.append("occasion", occasion);
  if (bond) query.append("bond", bond);
  if (tag) query.append("tag", tag);
  if (minPrice) query.append("minPrice", minPrice.toString());
  if (maxPrice) query.append("maxPrice", maxPrice.toString());
  if (sort) query.append("sort", sort);
  if (search) query.append("search", search);

  try {
  const res = await fetch(
  `${baseUrl}/api/products?${query.toString()}`,
  { next: { revalidate: 60 } }
)

    if (!res.ok) throw new Error("Failed to fetch products")

    return res.json()
  } catch (error) {
    console.error("Failed to fetch products in route page during build:", error);
    return [];
  }
}

export default async function ProductsPage({ 
  params, 
  searchParams 
}: { 
  params: Promise<{ filter?: string[] }>,
  searchParams: Promise<any> 
}) {
  const { filter } = await params;
  const sParams = await searchParams;

  // Initialize filters from searchParams as base
  let category = sParams.category;
  let occasion = sParams.occasion;
  let bond = sParams.bond;
  let minPrice = sParams.minPrice ? Number(sParams.minPrice) : undefined;
  let maxPrice = sParams.maxPrice ? Number(sParams.maxPrice) : undefined;
  const sort = sParams.sort;
  let search = sParams.search;

  // Override / Extend with path segments
  const TAG_SEGMENTS = ["for-her", "for-him", "gift-sets", "anniversary", "birthday", "wedding", "trending"];
  let tag = sParams.tag;

  if (filter && filter.length > 0) {
    if (filter.length === 1) {
      const segment = filter[0].toLowerCase();
      if (TAG_SEGMENTS.includes(segment)) {
        tag = segment;
      } else {
        // Assume single segment is category: /products/rings
        category = segment;
      }
    } else if (filter.length === 2) {
      const [type, slug] = filter;
      if (type === "occasion") occasion = slug;
      if (type === "bond") bond = slug;
      if (type === "tag") tag = slug;
      if (type === "name") search = slug.replace(/-/g, " ");
      if (type === "price") {
        if (slug === "under-1999") maxPrice = 1999;
        else if (slug === "2000-4999") { minPrice = 2000; maxPrice = 4999; }
        else if (slug === "5000-9999") { minPrice = 5000; maxPrice = 9999; }
        else if (slug === "luxury") minPrice = 10000;
      }
    }
  }

  // URL Preservation Helper
  const buildUrl = (updates: { category?: string; type?: string; slug?: string; sort?: string; clearAll?: boolean }) => {
    if (updates.clearAll) {
      return "/products";
    }

    const newParams = new URLSearchParams();
    
    // Maintain existing search and sort unless overwritten
    if (updates.sort !== undefined) {
      if (updates.sort) newParams.set("sort", updates.sort);
    } else if (sort) {
      newParams.set("sort", sort);
    }

    if (search) {
      newParams.set("search", search);
    }

    // Determine path based on category or other path filters
    let path = "/products";
    let newFilter = filter ? [...filter] : [];

    if (updates.category !== undefined) {
      if (updates.category) {
        newFilter = [updates.category];
      } else {
        newFilter = [];
      }
    } else if (updates.type !== undefined && updates.slug !== undefined) {
      if (updates.type && updates.slug) {
        newFilter = [updates.type, updates.slug];
      } else {
        newFilter = [];
      }
    }

    if (newFilter.length > 0) {
      path += `/${newFilter.join("/")}`;
    }

    const queryStr = newParams.toString();
    return queryStr ? `${path}?${queryStr}` : path;
  }

  const products = await getProducts({ category, occasion, bond, tag, minPrice, maxPrice, sort, search })

  // Derive Display Title
  let displayTitle = "All Jewelry";
  if (category) displayTitle = `${category.charAt(0).toUpperCase() + category.slice(1)} Collection`;
  if (occasion) displayTitle = `${occasion.charAt(0).toUpperCase() + occasion.slice(1)} Collection`;
  if (bond) displayTitle = `Gifts for ${bond.replace("-", " ")}`;
  if (tag) {
    if (tag === "for-her") displayTitle = "Gifts for Her";
    else if (tag === "for-him") displayTitle = "Gifts for Him";
    else if (tag === "gift-sets") displayTitle = "Exclusive Gift Sets";
    else displayTitle = `${tag.replace("-", " ").charAt(0).toUpperCase() + tag.replace("-", " ").slice(1)} Collection`;
  }
  if (search) displayTitle = `Results for "${search}"`;

  return (
    <div className="max-w-7xl mx-auto px-8 py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-bold text-secondary mb-2 capitalize">
            {displayTitle}
          </h1>
          <p className="text-gray-500 font-medium">Discover your perfect piece of elegance</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative group">
            <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-xl font-bold text-sm text-secondary hover:border-primary transition-colors transition-all active:scale-95">
              Sort By <ChevronDown size={16} />
            </button>
            <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
              <Link href={buildUrl({ sort: "newest" })} className={`block px-4 py-2 text-sm hover:bg-gray-50 hover:text-primary ${sort === "newest" || !sort ? "text-primary font-bold" : "text-gray-600"}`}>Newest First</Link>
              <Link href={buildUrl({ sort: "price-asc" })} className={`block px-4 py-2 text-sm hover:bg-gray-50 hover:text-primary ${sort === "price-asc" ? "text-primary font-bold" : "text-gray-600"}`}>Price: Low to High</Link>
              <Link href={buildUrl({ sort: "price-desc" })} className={`block px-4 py-2 text-sm hover:bg-gray-50 hover:text-primary ${sort === "price-desc" ? "text-primary font-bold" : "text-gray-600"}`}>Price: High to Low</Link>
              <Link href={buildUrl({ sort: "name-asc" })} className={`block px-4 py-2 text-sm hover:bg-gray-50 hover:text-primary ${sort === "name-asc" ? "text-primary font-bold" : "text-gray-600"}`}>Name: A to Z</Link>
              <Link href={buildUrl({ sort: "name-desc" })} className={`block px-4 py-2 text-sm hover:bg-gray-50 hover:text-primary ${sort === "name-desc" ? "text-primary font-bold" : "text-gray-600"}`}>Name: Z to A</Link>
              <Link href={buildUrl({ sort: "trending" })} className={`block px-4 py-2 text-sm hover:bg-gray-50 hover:text-primary ${sort === "trending" ? "text-primary font-bold" : "text-gray-600"}`}>Trending</Link>
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
              {/* Name Filter */}
              <div>
                <h4 className="font-bold text-sm uppercase tracking-wider text-gray-400 mb-4">Filter By Name</h4>
                <NameFilterInput />
              </div>

              {/* Category Filter */}
              <div>
                <h4 className="font-bold text-sm uppercase tracking-wider text-gray-400 mb-4">Category</h4>
                <div className="space-y-3">
                  {["Rings", "Earrings", "Necklaces", "Bracelets", "Pendants", "Mangalsutra", "Bangles", "Anklets"].map((cat) => (
                    <Link 
                      key={cat} 
                      href={buildUrl({ category: cat.toLowerCase() })}
                      className={`block text-sm font-medium transition-colors hover:text-primary ${category === cat.toLowerCase() ? "text-primary font-bold" : "text-gray-600"}`}
                    >
                      {cat}
                    </Link>
                  ))}
                  <Link href={buildUrl({ category: "" })} className="block text-sm font-medium text-gray-400 hover:text-primary">Clear Category</Link>
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <h4 className="font-bold text-sm uppercase tracking-wider text-gray-400 mb-4">Price Range</h4>
                <div className="space-y-3">
                  <Link href={buildUrl({ type: "price", slug: "under-1999" })} className={`block text-sm font-medium hover:text-primary ${minPrice === undefined && maxPrice === 1999 ? "text-primary font-bold" : "text-gray-600"}`}>Under ₹1,999</Link>
                  <Link href={buildUrl({ type: "price", slug: "2000-4999" })} className={`block text-sm font-medium hover:text-primary ${minPrice === 2000 && maxPrice === 4999 ? "text-primary font-bold" : "text-gray-600"}`}>₹2,000 - ₹4,999</Link>
                  <Link href={buildUrl({ type: "price", slug: "5000-9999" })} className={`block text-sm font-medium hover:text-primary ${minPrice === 5000 && maxPrice === 9999 ? "text-primary font-bold" : "text-gray-600"}`}>₹5,000 - ₹9,999</Link>
                  <Link href={buildUrl({ type: "price", slug: "luxury" })} className={`block text-sm font-medium hover:text-primary ${minPrice === 10000 && maxPrice === undefined ? "text-primary font-bold" : "text-gray-600"}`}>Above ₹10,000</Link>
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
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
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
                          price: product.dynamicPrice || product.price || 0,
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
                      <p className="text-xl font-bold text-secondary">
                        ₹{(product.dynamicPrice || product.price || 0).toLocaleString()}
                      </p>
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
