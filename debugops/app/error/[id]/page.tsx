import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Eye, ThumbsUp, Clock, Tag } from 'lucide-react'
import { format } from 'date-fns'

async function getError(slug: string) {
  const error = await prisma.error.findUnique({
    where: { slug },
    include: {
      category: true,
      tags: true,
    },
  })

  if (!error) return null

  await prisma.$transaction([
    prisma.error.update({
      where: { id: error.id },
      data: { views: { increment: 1 } },
    }),
    prisma.analytics.create({
      data: {
        errorId: error.id,
        action: 'view',
      },
    }),
  ])

  return error
}

const components = {
  code: ({ className, children, ...props }: any) => {
    const match = /language-(\w+)/.exec(className || '')
    return match ? (
      <SyntaxHighlighter
        style={vscDarkPlus}
        language={match[1]}
        PreTag="div"
        {...props}
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    ) : (
      <code className={`${className} bg-slate-800 px-2 py-1 rounded text-sm`} {...props}>
        {children}
      </code>
    )
  },
}

export default async function ErrorPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const error = await getError(id)

  if (!error) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <article className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded text-sm font-medium">
              {error.category.name}
            </span>
            {error.subcategory && (
              <span className="text-slate-400 text-sm">{error.subcategory}</span>
            )}
          </div>
          
          <h1 className="text-4xl font-bold mb-4">{error.title}</h1>
          
          <div className="flex items-center gap-6 text-sm text-slate-400">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {format(new Date(error.createdAt), 'MMM dd, yyyy')}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {error.views} views
            </span>
            <span className="flex items-center gap-1">
              <ThumbsUp className="w-4 h-4" />
              {error.likes} helpful
            </span>
          </div>
        </div>

        <div className="prose prose-invert prose-lg max-w-none mb-8">
          <MDXRemote source={error.content} components={components} />
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {error.tags.map((tag) => (
            <a
              key={tag.id}
              href={`/?q=${tag.name}`}
              className="px-3 py-1 bg-slate-800 text-slate-300 rounded hover:bg-slate-700 text-sm flex items-center gap-1"
            >
              <Tag className="w-3 h-3" />
              {tag.name}
            </a>
          ))}
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold mb-4">Was this solution helpful?</h3>
          <div className="flex justify-center gap-4">
            <button className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition">
              👍 Yes
            </button>
            <button className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition">
              👎 No
            </button>
          </div>
        </div>
      </article>
    </main>
  )
}