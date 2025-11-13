import { BookOpen, Code, Shield, Wrench, Terminal } from 'lucide-react'

interface Category {
  id: string
  name: string
  slug: string
  color: string | null
  _count: { errors: number }
}

const iconMap: Record<string, any> = {
  DevOps: Wrench,
  Programming: Code,
  Cybersecurity: Shield,
  Linux: Terminal,
}

export default function Sidebar({ categories }: { categories: Category[] }) {
  return (
    <div className="space-y-6">
      <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-400" />
          Categories
        </h3>
        <div className="space-y-3">
          {categories.map((cat) => {
            const Icon = iconMap[cat.name] || Code
            return (
              <a
                key={cat.id}
                href={`/?category=${cat.slug}`}
                className="w-full flex items-center justify-between p-3 bg-slate-900/50 rounded-lg hover:bg-slate-900 transition group"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 ${cat.color || 'bg-blue-500'} rounded-lg flex items-center justify-center`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-medium">{cat.name}</span>
                </div>
                <span className="text-slate-400 text-sm">{cat._count.errors}</span>
              </a>
            )
          })}
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-2">Weekly Error Digest</h3>
        <p className="text-sm text-blue-100 mb-4">
          Get the latest solutions delivered to your inbox
        </p>
        <form className="space-y-3">
          <input
            type="email"
            placeholder="your@email.com"
            className="w-full px-4 py-2 rounded bg-white/20 border border-white/30 placeholder-white/60 text-white"
            required
          />
          <button
            type="submit"
            className="w-full bg-white text-blue-600 font-semibold py-2 rounded hover:bg-blue-50 transition"
          >
            Subscribe
          </button>
        </form>
      </div>

      <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Database Stats</h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-400">Total Solutions</span>
            <span className="font-semibold">
              {categories.reduce((acc, cat) => acc + cat._count.errors, 0)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Categories</span>
            <span className="font-semibold">{categories.length}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Last Updated</span>
            <span className="font-semibold">Today</span>
          </div>
        </div>
      </div>
    </div>
  )
}