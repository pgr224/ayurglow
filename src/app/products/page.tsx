import { ProductCard } from '@/components/shared/ProductCard'
import { getProductsByCategory } from '@/lib/products'

export default function ProductsPage({ searchParams }: { searchParams: { category?: string } }) {
  const category = searchParams.category || 'all'
  const products = getProductsByCategory(category)

  return (
    <div className="container px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Products {category !== 'all' ? `- ${category}` : ''}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  )
}