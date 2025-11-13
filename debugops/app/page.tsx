import { prisma } from '@/lib/prisma'
import SearchBar from '@/components/SearchBar'
import ErrorCard from '@/components/ErrorCard'
import CategoryFilter from '@/components/CategoryFilter'
import Sidebar from '@/components/Sidebar'

export const dynamic = 'force-dynamic'

async function getErrors(category?: string, search?: string) {
  const where = {
    status: 'PUBLISHED' as const,
    ...(category && category !== 'all' ? { category: { slug: category } } : {}),
    ...(search ? {
      OR: [
        { title: { contains: search, mode: 'insensitive' as const } },
        { excerpt: { contains: search, mode: 'insensitive' as const } },
        { content: { contains: search, mode: 'insensitive' as const } },
      ]
    } : {})
  }

  return await prisma.error.findMany({
    where,
    include: {
      category: true,
      tags: true,
    },
    orderBy: { createdAt: 'desc' },
    take: 20,
  })
}

async function getCategories() {
  return await prisma.category.findMany({
    include: {
      _count: {
        select: { errors: true }
      }
    }
  })
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>
}) {
  const params = await searchParams
  const [errors, categories] = await Promise.all([
    getErrors(params.category, params.q),
    getCategories(),
  ])

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Find Solutions to Your
            <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-green-400 bg-clip-text text-transparent">
              DevOps, Programming & Security Errors
            </span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Real-world errors and solutions from a DevOps engineer&apos;s journey
          </p>
        </div>

        <SearchBar initialQuery={params.q} />
        <CategoryFilter 
          categories={categories} 
          selected={params.category || 'all'} 
        />

        <div className="grid lg:grid-cols-3 gap-8 mt-12">
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-semibold mb-4">
              {errors.length} Solutions Found
            </h2>
            {errors.map((error) => (
              <ErrorCard key={error.id} error={error} />
            ))}
            {errors.length === 0 && (
              <div className="text-center py-12 text-slate-400">
                <p>No errors found. Try a different search or category.</p>
              </div>
            )}
          </div>
          <Sidebar categories={categories} />
        </div>
      </section>
    </main>
  )
}