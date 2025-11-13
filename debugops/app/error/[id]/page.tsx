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

  // Increment view count
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
      
        {String(children).replace(/\n$/, '')}
      
    ) : (
      
        {children}
      
    )
  },
}

export default async function ErrorPage({
  params,
}: {
  params: { id: string }
}) {
  const error = await getError(params.id)

  if (!error) {
    notFound()
  }

  return (
    
      
        {/* Header */}
        
          
            
              {error.category.name}
            
            {error.subcategory && (
              {error.subcategory}
            )}
          
          
          {error.title}
          
          
            
              
              {format(new Date(error.createdAt), 'MMM dd, yyyy')}
            
            
              
              {error.views} views
            
            
              
              {error.likes} helpful
            
          
        

        {/* Content */}
        
          
        

        {/* Tags */}
        
          {error.tags.map((tag) => (
            <a
              key={tag.id}
              href={`/?q=${tag.name}`}
              className="px-3 py-1 bg-slate-800 text-slate-300 rounded hover:bg-slate-700 text-sm flex items-center gap-1"
            >
              
              {tag.name}
            
          ))}
        

        {/* Was this helpful? */}
        
          Was this solution helpful?
          
            
              👍 Yes
            
            
              👎 No
            
          
        
      
    
  )
}