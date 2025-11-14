import { Calendar, Clock, ArrowRight } from 'lucide-react'
import Link from 'next/link'

// Mock blog data - Replace with database later
const blogPosts = [
  {
    slug: 'getting-started-with-debugops',
    title: 'Getting Started with DebugOps',
    excerpt: 'Learn how to use DebugOps to document and solve your development errors. A comprehensive guide for developers.',
    author: 'DebugOps Team',
    date: '2024-11-10',
    readTime: '5 min read',
    category: 'Tutorial',
    featured: true
  },
  {
    slug: 'top-10-docker-errors',
    title: 'Top 10 Docker Errors and How to Fix Them',
    excerpt: 'A comprehensive guide to the most common Docker errors developers encounter and their proven solutions.',
    author: 'DevOps Expert',
    date: '2024-11-12',
    readTime: '10 min read',
    category: 'DevOps',
    featured: true
  },
  {
    slug: 'python-debugging-tips',
    title: 'Essential Python Debugging Tips',
    excerpt: 'Master Python debugging with these essential tips and tricks used by professional developers.',
    author: 'Python Developer',
    date: '2024-11-08',
    readTime: '8 min read',
    category: 'Programming',
    featured: false
  },
  {
    slug: 'kubernetes-troubleshooting-guide',
    title: 'Kubernetes Troubleshooting Guide',
    excerpt: 'Complete guide to troubleshooting common Kubernetes issues in production environments.',
    author: 'Cloud Architect',
    date: '2024-11-05',
    readTime: '12 min read',
    category: 'DevOps',
    featured: false
  }
]

async function getBlogPosts() {
  // Simulate database fetch
  return blogPosts
}

export default async function BlogPage() {
  const posts = await getBlogPosts()
  const featuredPosts = posts.filter(p => p.featured)
  const regularPosts = posts.filter(p => !p.featured)

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Blog
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Insights & Tutorials
            </span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Learn from real-world debugging experiences, tutorials, and best practices
          </p>
        </div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="text-yellow-400">⭐</span>
              Featured Posts
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group"
                >
                  <article className="bg-slate-800/50 border border-slate-700 rounded-lg overflow-hidden hover:border-blue-500 transition h-full">
                    <div className="p-6">
                      <div className="mb-4">
                        <span className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded text-sm font-medium">
                          {post.category}
                        </span>
                      </div>
                      
                      <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-400 transition">
                        {post.title}
                      </h3>
                      
                      <p className="text-slate-400 mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm text-slate-500">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(post.date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {post.readTime}
                          </span>
                        </div>
                        <ArrowRight className="w-5 h-5 text-blue-400 group-hover:translate-x-1 transition" />
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* All Posts */}
        <section>
          <h2 className="text-2xl font-bold mb-6">All Posts</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group"
              >
                <article className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-blue-500 transition h-full flex flex-col">
                  <div className="mb-3">
                    <span className="px-2 py-1 bg-slate-700 text-slate-300 rounded text-xs font-medium">
                      {post.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition flex-1">
                    {post.title}
                  </h3>
                  
                  <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-700">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(post.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>

        {/* Categories Filter (Optional) */}
        <section className="mt-12 bg-slate-800/50 border border-slate-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Browse by Category</h3>
          <div className="flex flex-wrap gap-3">
            {['All', 'DevOps', 'Programming', 'Cybersecurity', 'Tutorial'].map((category) => (
              <button
                key={category}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm transition"
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="mt-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-2">Never Miss an Update</h3>
          <p className="text-blue-100 mb-6">
            Get the latest debugging tips and tutorials delivered to your inbox
          </p>
          <form className="max-w-md mx-auto flex gap-3">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 rounded-lg bg-white/20 border border-white/30 placeholder-white/60 text-white"
              required
            />
            <button
              type="submit"
              className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition"
            >
              Subscribe
            </button>
          </form>
        </section>
      </div>
    </main>
  )
}