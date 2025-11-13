// app/admin/new/page.tsx
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Save, Eye, X } from 'lucide-react'

// This is a simple admin panel without authentication
// For production, add NextAuth.js for security

export default function NewErrorPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: '',
    categoryId: '',
    subcategory: '',
    excerpt: '',
    content: '',
    tags: '',
    status: 'PUBLISHED'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [preview, setPreview] = useState(false)

  const categories = [
    { id: '1', name: 'DevOps' },
    { id: '2', name: 'Programming' },
    { id: '3', name: 'Cybersecurity' },
    { id: '4', name: 'Linux' },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/errors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
        }),
      })

      if (response.ok) {
        const data = await response.json()
        router.push(`/error/${data.slug}`)
      } else {
        alert('Failed to create error')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Failed to create error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const templateContent = `# Problem

Describe the error message or issue here.

\`\`\`bash
# Show the actual error
Error: Your error message here
\`\`\`

## Root Cause

Explain why this error occurs:
1. First reason
2. Second reason
3. Third reason

## Solution

### Step 1: First Action

\`\`\`bash
# Command to fix
command --option value
\`\`\`

Explain what this does.

### Step 2: Second Action

\`\`\`bash
# Another command
another-command
\`\`\`

### Step 3: Verify the Fix

\`\`\`bash
# Verification command
check-command
\`\`\`

Expected output:
\`\`\`
Success message here
\`\`\`

## Prevention

How to avoid this error in the future:
- Tip 1
- Tip 2
- Tip 3

## Related Errors

- Link to related error 1
- Link to related error 2`

  const insertTemplate = () => {
    setFormData({ ...formData, content: templateContent })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Add New Error Solution</h1>
            <p className="text-slate-400">Document your error and solution</p>
          </div>
          <button
            onClick={() => router.push('/')}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Error Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder='e.g., Docker: "Cannot connect to Docker daemon" Error'
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Category */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Category *
                  </label>
                  <select
                    required
                    value={formData.categoryId}
                    onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select...</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Subcategory
                  </label>
                  <input
                    type="text"
                    value={formData.subcategory}
                    onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                    placeholder="e.g., Docker, AWS, Python"
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Short Description
                </label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="Brief description for the error list..."
                  rows={2}
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="docker, daemon, linux"
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Content */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium">
                    Solution Content (Markdown) *
                  </label>
                  <button
                    type="button"
                    onClick={insertTemplate}
                    className="text-xs text-blue-400 hover:text-blue-300"
                  >
                    Insert Template
                  </button>
                </div>
                <textarea
                  required
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Write your solution in Markdown format..."
                  rows={20}
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 rounded-lg font-semibold transition flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  {isSubmitting ? 'Publishing...' : 'Publish Solution'}
                </button>
                <button
                  type="button"
                  onClick={() => setPreview(!preview)}
                  className="px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-lg transition flex items-center gap-2"
                >
                  <Eye className="w-5 h-5" />
                  Preview
                </button>
              </div>
            </form>
          </div>

          {/* Preview */}
          {preview && (
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Preview</h3>
              <div className="prose prose-invert prose-sm max-w-none">
                <h1>{formData.title || 'Error Title'}</h1>
                {formData.excerpt && <p className="text-slate-400">{formData.excerpt}</p>}
                <div className="mt-4 whitespace-pre-wrap">
                  {formData.content || 'Content will appear here...'}
                </div>
                {formData.tags && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {formData.tags.split(',').map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-slate-700 rounded text-xs"
                      >
                        #{tag.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Markdown Help */}
        <div className="mt-8 bg-slate-800/50 border border-slate-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Markdown Quick Reference</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">Headers</h4>
              <code className="block bg-slate-900 p-2 rounded">
                # H1<br />
                ## H2<br />
                ### H3
              </code>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Code Blocks</h4>
              <code className="block bg-slate-900 p-2 rounded">
                ```bash<br />
                command here<br />
                ```
              </code>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Lists</h4>
              <code className="block bg-slate-900 p-2 rounded">
                - Item 1<br />
                - Item 2<br />
                1. First<br />
                2. Second
              </code>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Inline Code</h4>
              <code className="block bg-slate-900 p-2 rounded">
                Use `code` for inline
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}