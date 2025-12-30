// app/dashboard/layout.tsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { 
  LayoutDashboard, Link as LinkIcon, KeyRound, Code2, FileText, Settings 
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { name: 'Overview', icon: LayoutDashboard, path: '/dashboard' },
  { name: 'Provider', icon: LinkIcon, path: '/dashboard/provider' },
  { name: 'Generate Key', icon: KeyRound, path: '/dashboard/generate' },
  { name: 'Lua Script', icon: Code2, path: '/dashboard/lua' },
  { name: 'Page', icon: FileText, path: '/dashboard/page' },
  { name: 'Settings', icon: Settings, path: '/settings' },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Super simple "auth" check (replace with real auth later)
  useEffect(() => {
    const loggedIn = localStorage.getItem('nexusguard-logged-in') === 'true'
    if (!loggedIn) {
      router.replace('/auth')
    } else {
      setIsAuthenticated(true)
    }
  }, [router])

  if (!isAuthenticated) return null // or loading spinner

  return (
    <div className="min-h-screen flex bg-[var(--bg-primary)] text-[var(--text-primary)]">
      {/* Sidebar */}
      <aside className="hidden md:block w-64 bg-[var(--card-bg)] border-r border-[var(--border)] shadow-xl">
        <div className="p-6 border-b border-[var(--border)]">
          <h1 className="text-2xl font-black tracking-wider neon-text glitch">
            NEXUS<span className="text-[var(--accent-magenta)]">GUARD</span>
          </h1>
        </div>
        
        <nav className="mt-8 px-3 space-y-2">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all",
                item.path === window.location.pathname
                  ? "bg-[var(--accent-cyan)]/20 text-[var(--accent-cyan)] border-l-4 border-[var(--accent-cyan)]"
                  : "text-[var(--text-secondary)] hover:bg-[var(--accent-cyan)]/10 hover:text-[var(--accent-cyan)]"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </a>
          ))}
        </nav>
      </aside>

      {/* Mobile sidebar (simple top bar for now) */}
      <div className="md:hidden w-full bg-[var(--card-bg)] border-b border-[var(--border)] p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold neon-text">NexusGuard</h1>
        <span className="text-sm text-[var(--text-secondary)]">Menu</span>
      </div>

      {/* Main content */}
      <main className="flex-1 p-6 md:p-10 overflow-auto">
        {children}
      </main>
    </div>
  )
}
