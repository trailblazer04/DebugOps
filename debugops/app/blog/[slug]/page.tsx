import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Calendar, Clock, User } from 'lucide-react'

// Mock blog data - Replace with your database later
const blogPosts = [
  {
    slug: 'getting-started-with-debugops',
    title: 'Getting Started with DebugOps',
    excerpt: 'Learn how to use DebugOps to document and solve your development errors',
    content: `# Getting Started with DebugOps

Welcome to DebugOps! This guide will help you get started with documenting your errors and solutions.

## Why Document Errors?

Every developer encounters errors. Instead of solving the same problem multiple times, document it once and reference it forever.

## How to Use DebugOps

### 1. Browse Existing Solutions

Use the search bar to find solutions to common errors. Our database covers:
- DevOps (Docker, Kubernetes, CI/CD)
- Programming (Python, C/C++)
- Cybersecurity (Ethical Hacking)
- Linux System Administration

### 2. Add Your Own Solutions

Found a solution to an error? Share it with the community:

\`\`\`bash
# Access the admin panel
https://debugops.dev/admin/new
\`\`\`

### 3. Build Your Knowledge Base

As you document errors, you're building a personal knowledge base that you can reference anytime.

## Best Practices

1. **Be Specific**: Include exact error messages
2. **Show Context**: Explain when/where the error occurs
3. **Provide Steps**: Clear, step-by-step solutions
4. **Add Prevention**: How to avoid the error in the future

## Start Documenting Today!

Turn your debugging experience into valuable documentation that helps you and others.`,
    author: 'DebugOps Team',
    date: '2024-11-10',
    readTime: '5 min read',
    category: 'Tutorial'
  },
  {
    slug: 'top-10-docker-errors',
    title: 'Top 10 Docker Errors and How to Fix Them',
    excerpt: 'A comprehensive guide to the most common Docker errors and their solutions',
    content: `# Top 10 Docker Errors and How to Fix Them

Docker is powerful but can be tricky. Here are the top 10 errors developers encounter.

## 1. Cannot Connect to Docker Daemon

\`\`\`bash
Cannot connect to the Docker daemon at unix:///var/run/docker.sock
\`\`\`

**Solution**: Start the Docker daemon or add your user to the docker group.

## 2. Port Already in Use

When trying to run a container:

\`\`\`bash
Error: Bind for 0.0.0.0:8080 failed: port is already allocated
\`\`\`

**Solution**: 
\`\`\`bash
# Find the process using the port
lsof -i :8080
# Kill the process or use a different port
docker run -p 8081:8080 myapp
\`\`\`

## 3. Image Not Found

\`\`\`bash
Error response from daemon: pull access denied, repository does not exist
\`\`\`

**Solution**: Check image name spelling and ensure you're logged in to the registry.

## Continue Reading...

Visit [debugops.dev/error/docker-errors](/) for detailed solutions to all Docker errors.`,
    author: 'DevOps Expert',
    date: '2024-11-12',
    readTime: '10 min read',
    category: 'DevOps'
  }
]

async function getBlogPost(slug: string) {
  // Simulate database fetch
  const post = blogPosts.find(p => p.slug === slug)
  return post || null
}

// Generate static paths for blog posts
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

const components = {
  code: ({ className, children, ...props }: { className?: string; children?: React.ReactNode; [key: string]: unknown }) => {
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
      <code className={`${className || ''} bg-slate-800 px-2 py-1 rounded text-sm`} {...props}>
        {children}
      </code>
    )
  },
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <article className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-4">
            <span className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded text-sm font-medium">
              {post.category}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {post.title}
          </h1>
          
          <p className="text-xl text-slate-400 mb-6">
            {post.excerpt}
          </p>
          
          <div className="flex items-center gap-6 text-sm text-slate-400">
            <span className="flex items-center gap-2">
              <User className="w-4 h-4" />
              {post.author}
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {new Date(post.date).toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none mb-12">
          <MDXRemote source={post.content} components={components} />
        </div>

        {/* Author Bio */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-2xl font-bold">
              {post.author.charAt(0)}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-1">{post.author}</h3>
              <p className="text-slate-400 text-sm mb-3">
                DevOps engineer sharing real-world solutions to common development errors.
              </p>
              <div className="flex gap-3">
                <a href="https://twitter.com" className="text-blue-400 hover:text-blue-300 text-sm">
                  Twitter
                </a>
                <a href="https://github.com" className="text-blue-400 hover:text-blue-300 text-sm">
                  GitHub
                </a>
                <a href="https://linkedin.com" className="text-blue-400 hover:text-blue-300 text-sm">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        <div className="border-t border-slate-700 pt-8">
          <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {blogPosts
              .filter(p => p.slug !== slug)
              .slice(0, 2)
              .map((relatedPost) => (
                <a
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-blue-500 transition"
                >
                  <span className="text-xs text-blue-400 font-medium">
                    {relatedPost.category}
                  </span>
                  <h3 className="text-lg font-semibold mt-2 mb-2">
                    {relatedPost.title}
                  </h3>
                  <p className="text-slate-400 text-sm mb-3">
                    {relatedPost.excerpt}
                  </p>
                  <span className="text-xs text-slate-500">
                    {relatedPost.readTime}
                  </span>
                </a>
              ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg p-8 text-center mt-12">
          <h3 className="text-2xl font-bold mb-2">Have an error to share?</h3>
          <p className="text-blue-100 mb-6">
            Help the community by documenting your solutions
          </p>
          <a
            href="/admin/new"
            className="inline-block bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition"
          >
            Add Your Solution
          </a>
        </div>
      </article>
    </main>
  )
}