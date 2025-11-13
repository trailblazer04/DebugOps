// app/admin/page.tsx
import Link from 'next/link'
import { Plus, Edit, Trash2, Eye } from 'lucide-react'
import { prisma } from '@/lib/prisma'

async function getRecentErrors() {
  return await prisma.error.findMany({
    include: {
      category: true,
      _count: {
        select: { tags: true }
      }
    },
    orderBy: { createdAt: 'desc' },
    take: 20,
  })
}

export default async function AdminDashboard() {
  const errors = await getRecentErrors()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-slate-400">Manage your error solutions</p>
          </div>
          <Link
            href="/admin/new"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            New Solution
          </Link>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <div className="text-2xl font-bold mb-1">{errors.length}</div>
            <div className="text-sm text-slate-400">Total Solutions</div>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <div className="text-2xl font-bold mb-1">
              {errors.reduce((acc, e) => acc + e.views, 0)}
            </div>
            <div className="text-sm text-slate-400">Total Views</div>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <div className="text-2xl font-bold mb-1">
              {errors.reduce((acc, e) => acc + e.likes, 0)}
            </div>
            <div className="text-sm text-slate-400">Total Likes</div>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <div className="text-2xl font-bold mb-1">
              {errors.filter(e => e.status === 'PUBLISHED').length}
            </div>
            <div className="text-sm text-slate-400">Published</div>
          </div>
        </div>

        {/* Error List */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-900/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase">
                  Views
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {errors.map((error) => (
                <tr key={error.id} className="hover:bg-slate-900/30">
                  <td className="px-6 py-4">
                    <div className="font-medium">{error.title}</div>
                    <div className="text-sm text-slate-400">{error._count.tags} tags</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-blue-600/20 text-blue-400 rounded text-xs">
                      {error.category.name}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">{error.views}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs ${
                      error.status === 'PUBLISHED' 
                        ? 'bg-green-600/20 text-green-400'
                        : 'bg-yellow-600/20 text-yellow-400'
                    }`}>
                      {error.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <Link
                        href={`/error/${error.slug}`}
                        className="p-2 hover:bg-slate-700 rounded transition"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button className="p-2 hover:bg-slate-700 rounded transition">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-red-900/50 text-red-400 rounded transition">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}