import Link from 'next/link'
import { Terminal, Home, Users } from 'lucide-react'

export default function Header() {
  return (
    <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo - Clickable to Home */}
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <Terminal className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                DebugOps.dev
              </h1>
              <p className="text-xs text-slate-400">Error Solutions Database</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center space-x-6 text-sm">
            <Link 
              href="/" 
              className="flex items-center gap-2 text-slate-300 hover:text-white transition"
            >
              <Home className="w-4 h-4" />
              <span className="hidden md:inline">Home</span>
            </Link>
            <Link 
              href="/blog" 
              className="text-slate-300 hover:text-white transition"
            >
              Blog
            </Link>
            <Link 
              href="/admin" 
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition"
            >
              <Users className="w-4 h-4" />
              <span className="hidden md:inline">Admin</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}