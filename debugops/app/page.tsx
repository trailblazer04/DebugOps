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
  searchParams: { category?: string; q?: string }
}) {
  const [errors, categories] = await Promise.all([
    getErrors(searchParams.category, searchParams.q),
    getCategories(),
  ])

  return (
    
      {/* Hero Section */}
      
        
          
            Find Solutions to Your
            
              DevOps, Programming & Security Errors
            
          
          
            Real-world errors and solutions from a DevOps engineer's journey
          
        

        
        

        
          
            
              {errors.length} Solutions Found
            
            {errors.map((error) => (
              
            ))}
            {errors.length === 0 && (
              
                No errors found. Try a different search or category.
              
            )}
          
          
        
      
    
  )
}