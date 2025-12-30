// app/settings/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { Switch } from '@/components/ui/switch'
import { Moon, Sun } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function Settings() {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const saved = localStorage.getItem('nexusguard-theme') || 'light'
    setTheme(saved)
    document.documentElement.setAttribute('data-theme', saved)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem('nexusguard-theme', newTheme)
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold neon-text">Settings</h1>
      
      <Card className="card">
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between py-4">
            <div>
              <p className="font-medium">Dark Mode</p>
              <p className="text-sm text-[var(--text-secondary)]">Switch between light & dark theme</p>
            </div>
            <div className="flex items-center gap-3">
              <Sun className="w-5 h-5 text-yellow-500" />
              <Switch checked={theme === 'dark'} onCheckedChange={toggleTheme} />
              <Moon className="w-5 h-5 text-[var(--accent-cyan)]" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
