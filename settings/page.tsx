// app/settings/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Moon, Sun } from 'lucide-react'

export default function SettingsPage() {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    // Load saved theme
    const savedTheme = localStorage.getItem('nexusguard-theme') || 'light'
    setTheme(savedTheme)
    document.documentElement.setAttribute('data-theme', savedTheme)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem('nexusguard-theme', newTheme)
  }

  return (
    <div className="min-h-screen p-6 md:p-10">
      <Card className="card max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl neon-text">Settings</CardTitle>
          <CardDescription>Customize your NexusGuard experience</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-lg font-medium">Theme Mode</Label>
              <p className="text-sm text-[var(--text-secondary)]">
                Switch between light (white) and dark (black) interface
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Sun className="h-5 w-5 text-yellow-500" />
              <Switch
                checked={theme === 'dark'}
                onCheckedChange={toggleTheme}
                className="data-[state=checked]:bg-[var(--accent-magenta)]"
              />
              <Moon className="h-5 w-5 text-[var(--accent-cyan)]" />
            </div>
          </div>

          {/* You can add more settings here later */}
        </CardContent>
      </Card>
    </div>
  )
}
