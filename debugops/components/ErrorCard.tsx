// components/ErrorCard.tsx
import Link from 'next/link'
import { Eye, ThumbsUp, Clock, ChevronRight } from 'lucide-react'
import { format } from 'date-fns'

interface ErrorCardProps {
  error: {
    id: string
    slug: string
    title: string
    excerpt: string | null
    category: { name: string }
    subcategory: string | null
    tags: { name: string }[]
    views: number
    likes: number
    createdAt: Date
  }
}

export default function ErrorCard({ error }: ErrorCardProps) {
  return (
    <Link href={`/error/${error.slug}`}>
      <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-blue-500 transition cursor-pointer group">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded text-xs font-medium">
                {error.category.name}
              </span>
              {error.subcategory && (
                <span className="text-slate-500 text-xs">{error.subcategory}</span>
              )}
            </div>
            <h3 className="text-lg font-semibold group-hover:text-blue-400 transition mb-2">
              {error.title}
            </h3>
            {error.excerpt && (
              <p className="text-slate-400 text-sm line-clamp-2">
                {error.excerpt}
              </p>
            )}
          </div>
          <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-blue-400 transition flex-shrink-0 ml-4" />
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-slate-700">
          <div className="flex gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {error.views}
            </span>
            <span className="flex items-center gap-1">
              <ThumbsUp className="w-4 h-4" />
              {error.likes}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {format(new Date(error.createdAt), 'MMM dd, yyyy')}
            </span>
          </div>
          <div className="flex gap-2">
            {error.tags.slice(0, 3).map((tag) => (
              <span key={tag.name} className="text-xs text-slate-500 hover:text-blue-400">
                #{tag.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
}