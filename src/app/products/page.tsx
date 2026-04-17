import React, { Suspense } from 'react'
import { ProductCard } from '@/components/shared/ProductCard'
import { ProductFilters } from '@/components/products/ProductFilters'
import { filterProducts } from '@/lib/products'
import { PRODUCT_TYPES, SKIN_TYPES, CONCERNS, INGREDIENTS } from '@/lib/categories'
import { Filter } from 'lucide-react'

export const runtime = 'edge'

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>
}) {
  const resolvedParams = await searchParams
  
  const type = resolvedParams.type || 'all'
  const skinType = resolvedParams.skinType
  const concern = resolvedParams.concern
  const ingredient = resolvedParams.ingredient

  const products = filterProducts({ type, skinType, concern, ingredient })

  // Build a dynamic title based on filters
  let pageTitle = 'All Products'
  if (type !== 'all') {
    const typeObj = PRODUCT_TYPES.find(t => t.id === type)
    if (typeObj) pageTitle = typeObj.label
  }

  return (
    <div className="bg-[#FAF9F6] min-h-screen py-8">
      <div className="container px-4">
        
        {/* Page Header */}
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-black tracking-tight italic text-primary uppercase">
            {pageTitle}
          </h1>
          <p className="text-muted-foreground mt-2 font-medium">
            Explore our authentic Ayurvedic formulations for your unique skin needs.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters - Left Side on Desktop */}
          <aside className="w-full lg:w-72 shrink-0">
            <div className="sticky top-24">
              <Suspense fallback={<div className="h-96 animate-pulse bg-white rounded-2xl"></div>}>
                <ProductFilters />
              </Suspense>
            </div>
          </aside>

          {/* Product Grid - Right Side on Desktop */}
          <main className="flex-1 min-w-0">
            {/* Active Filters Summary & Product Count */}
            <div className="flex items-center justify-between mb-6 pb-2 border-b">
               <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                 Showing {products.length} {products.length === 1 ? 'Product' : 'Products'}
               </p>
            </div>

            {products.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-24 bg-white rounded-3xl border shadow-sm flex flex-col items-center">
                <div className="w-16 h-16 bg-muted/30 rounded-full flex items-center justify-center mb-4">
                  <Filter className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2">No products found</h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-6">
                  We couldn't find any products matching your selected filters. Try clearing some filters to see more results.
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}