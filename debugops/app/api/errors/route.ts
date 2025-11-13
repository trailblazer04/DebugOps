import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const search = searchParams.get('q')
  const limit = parseInt(searchParams.get('limit') || '20')

  try {
    const errors = await prisma.error.findMany({
      where: {
        status: 'PUBLISHED',
        ...(category && category !== 'all' ? { category: { slug: category } } : {}),
        ...(search ? {
          OR: [
            { title: { contains: search, mode: 'insensitive' } },
            { excerpt: { contains: search, mode: 'insensitive' } },
          ]
        } : {})
      },
      include: {
        category: true,
        tags: true,
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
    })

    return NextResponse.json(errors)
  } catch (error) {
    console.error('Error fetching errors:', error)
    return NextResponse.json(
      { error: 'Failed to fetch errors' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, content, categoryId, tags, subcategory, excerpt } = body

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    const error = await prisma.error.create({
      data: {
        title,
        slug,
        content,
        categoryId,
        subcategory,
        excerpt,
        tags: {
          connectOrCreate: tags.map((tag: string) => ({
            where: { name: tag },
            create: {
              name: tag,
              slug: tag.toLowerCase().replace(/\s+/g, '-'),
            },
          })),
        },
      },
    })

    return NextResponse.json(error)
  } catch (error) {
    console.error('Error creating error:', error)
    return NextResponse.json(
      { error: 'Failed to create error' },
      { status: 500 }
    )
  }
}