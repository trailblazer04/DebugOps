'use client'
import { useRouter, useSearchParams } from 'next/navigation'

interface Category {
  id: string
  name: string
  slug: string
  _count: { errors: number }
}

interface CategoryFilterProps {
  categories: Category[]
  selected: string
}

export default function CategoryFilter({ categories, selected }: CategoryFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleCategoryChange = (slug: string) => {
    const params = new URLSearchParams(searchParams)
    if (slug === 'all') {
      params.delete('category')
    } else {
      params.set('category', slug)
    }
    router.push(`/?${params.toString()}`)
  }

  return (
    <div className="flex flex-wrap justify-center gap-3">
      <button
        onClick={() => handleCategoryChange('all')}
        className={`px-6 py-2 rounded-full transition ${
          selected === 'all'
            ? 'bg-blue-600 text-white'
            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
        }`}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => handleCategoryChange(cat.slug)}
          className={`px-6 py-2 rounded-full transition ${
            selected === cat.slug
              ? 'bg-blue-600 text-white'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          {cat.name} ({cat._count.errors})
        </button>
      ))}
    </div>
  )
}