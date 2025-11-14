import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import ErrorCard from '@/components/ErrorCard'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

async function getCategory(slug: string) {
  const category = await prisma.category.findUnique({
    where: { slug },
    include: {
      _count: {
        select: { errors: true }
      }
    }
  })

  if (!category) return null

  const errors = await prisma.error.findMany({
    where: {
      status: 'PUBLISHED',
      categoryId: category.id
    },
    include: {
      category: true,
      tags: true,
    },
    orderBy: { createdAt: 'desc' },
  })

  return { category, errors }
}

// Generate static paths for categories
export async function generateStaticParams() {
  const categories = await prisma.category.findMany({
    select: { slug: true }
  })

  return categories.map((category) => ({
    slug: category.slug,
  }))
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const data = await getCategory(slug)

  if (!data) {
    notFound()
  }

  const { category, errors } = data

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        {/* Category Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-16 h-16 ${category.color || 'bg-blue-500'} rounded-lg flex items-center justify-center text-2xl`}>
              {category.icon === 'Wrench' && '🔧'}
              {category.icon === 'Code' && '💻'}
              {category.icon === 'Shield' && '🛡️'}
              {category.icon === 'Terminal' && '⌨️'}
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold">
                {category.name}
              </h1>
              <p className="text-slate-400 text-lg mt-2">
                {category.description}
              </p>
            </div>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 inline-flex items-center gap-2">
            <span className="text-2xl font-bold text-blue-400">
              {category._count.errors}
            </span>
            <span className="text-slate-400">
              {category._count.errors === 1 ? 'solution' : 'solutions'} available
            </span>
          </div>
        </div>

        {/* Errors List */}
        {errors.length > 0 ? (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-6">All Solutions</h2>
            {errors.map((error) => (
              <ErrorCard key={error.id} error={error} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-2xl font-bold mb-2">No solutions yet</h3>
            <p className="text-slate-400 mb-6">
              Be the first to add a solution in this category!
            </p>
            <Link
              href="/admin/new"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition"
            >
              Add Solution
            </Link>
          </div>
        )}

        {/* Related Categories */}
        <div className="mt-16 border-t border-slate-700 pt-12">
          <h2 className="text-2xl font-bold mb-6">Browse Other Categories</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link
              href="/?category=devops"
              className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-blue-500 transition"
            >
              <div className="text-2xl mb-2">🔧</div>
              <h3 className="text-lg font-semibold mb-1">DevOps</h3>
              <p className="text-slate-400 text-sm">Docker, Kubernetes, CI/CD</p>
            </Link>
            <Link
              href="/?category=programming"
              className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-blue-500 transition"
            >
              <div className="text-2xl mb-2">💻</div>
              <h3 className="text-lg font-semibold mb-1">Programming</h3>
              <p className="text-slate-400 text-sm">Python, C/C++, Languages</p>
            </Link>
            <Link
              href="/?category=cybersecurity"
              className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-blue-500 transition"
            >
              <div className="text-2xl mb-2">🛡️</div>
              <h3 className="text-lg font-semibold mb-1">Cybersecurity</h3>
              <p className="text-slate-400 text-sm">Ethical Hacking, Security</p>
            </Link>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-2">
            Found a solution for {category.name}?
          </h3>
          <p className="text-blue-100 mb-6">
            Help the community by sharing your knowledge
          </p>
          <Link
            href="/admin/new"
            className="inline-block bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition"
          >
            Add Your Solution
          </Link>
        </div>
      </div>
    </main>
  )
}