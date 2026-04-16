import { ProductCard } from '@/components/shared/ProductCard'
import { Button } from '@/components/ui/button'

export default function ProductsPage({ searchParams }: { searchParams: { category?: string } }) {
  const category = searchParams.category || 'all'

  // Placeholder products - in real app, fetch from DB
  const products = [
    {
      id: '1',
      name: 'Ceramide & Vitamin C Sunscreen - 50 Gm',
      slug: 'ceramide-vitamin-c-sunscreen',
      price: 499,
      mrp: 599,
      rating: 4.4,
      reviews: 794,
      image: '/images/product-1.jpg',
      badge: 'Bestseller',
      category: 'PROTECT'
    },
    // Add more products as needed
  ]

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