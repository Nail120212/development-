// app/dashboard/layout.tsx
'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { 
  LayoutDashboard, Link as LinkIcon, KeyRound, Code2, FileText, Settings, Menu 
} from 'lucide-react'

const navItems = [
  { name: 'Overview', icon: LayoutDashboard, path: '/dashboard' },
  { name: 'Provider', icon: LinkIcon, path: '/dashboard/provider' },
  { name: 'Generate Key', icon: KeyRound, path: '/dashboard/generate' },
  { name: 'Lua Script', icon: Code2, path: '/dashboard/lua' },
  { name: 'Page', icon: FileText, path: '/dashboard/page' },
  { name: 'Settings', icon: Settings, path: '/settings' },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('nexusguard-logged-in') === 'true'
    if (!isLoggedIn) {
      router.replace('/auth')
    }
  }, [router])

  return (
    <div className="min-h-screen flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:block w-64 bg-[var(--card-bg)] border-r border-[var(--border)]">
        <div className="p-6 border-b border-[var(--border)]">
          <h1 className="text-2xl font-black neon-text glitch">NEXUSGUARD</h1>
        </div>
        <nav className="mt-6 px-3 space-y-1">
          {navItems.map(item => (
            <a
              key={item.path}
              href={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                pathname === item.path
                  ? 'bg-[var(--accent-cyan)]/15 text-[var(--accent-cyan)] border-l-4 border-[var(--accent-cyan)]'
                  : 'hover:bg-[var(--accent-cyan)]/10 text-[var(--text-secondary)]'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </a>
          ))}
        </nav>
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-[var(--card-bg)] border-b border-[var(--border)] z-50 p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold neon-text">NexusGuard</h1>
        <button onClick={() => setIsMobileOpen(!isMobileOpen)}>
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile sidebar overlay */}
      {isMobileOpen && (
        <div className="md:hidden fixed inset-0 bg-black/60 z-40" onClick={() => setIsMobileOpen(false)}>
          <div className="bg-[var(--card-bg)] w-64 h-full p-6" onClick={e => e.stopPropagation()}>
            <nav className="space-y-2 mt-12">
              {navItems.map(item => (
                <a key={item.path} href={item.path} className="block px-4 py-3 rounded-lg hover:bg-[var(--accent-cyan)]/10">
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}

      <main className="flex-1 p-6 md:p-10 mt-16 md:mt-0">
        {children}
      </main>
    </div>
  )
      }
