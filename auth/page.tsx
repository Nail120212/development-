// app/auth/page.tsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Shield, Terminal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useRouter } from 'next/navigation'

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Fake login - in real app use auth here
    localStorage.setItem('nexusguard-logged-in', 'true')
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/40 to-purple-50/30 pointer-events-none" />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md z-10">
        <Card className="card">
          <CardHeader className="text-center space-y-3">
            <Shield className="w-12 h-12 mx-auto text-[var(--accent-cyan)] animate-pulse" />
            <CardTitle className="text-4xl font-black neon-text glitch">NEXUSGUARD</CardTitle>
            <CardDescription className="text-[var(--text-secondary)]">Secure. Protect. Dominate.</CardDescription>
          </CardHeader>

          <CardContent>
            <div className="space-y-6">
              <div className="flex justify-center gap-6">
                <Button variant="ghost" className={isLogin ? "border-b-2 border-[var(--accent-cyan)] text-[var(--accent-cyan)]" : ""} onClick={() => setIsLogin(true)}>
                  Login
                </Button>
                <Button variant="ghost" className={!isLogin ? "border-b-2 border-[var(--accent-cyan)] text-[var(--accent-cyan)]" : ""} onClick={() => setIsLogin(false)}>
                  Sign Up
                </Button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {!isLogin && (
                  <div className="space-y-2">
                    <Label>Username</Label>
                    <div className="relative">
                      <Terminal className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--accent-cyan)]/70" />
                      <Input className="pl-10" placeholder="nexus_dev" />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input type="email" placeholder="dev@nexusguard.dev" />
                </div>

                <div className="space-y-2">
                  <Label>Password</Label>
                  <div className="relative">
                    <Input type={showPassword ? "text" : "password"} placeholder="••••••••" className="pr-10" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2">
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <Button type="submit" className="w-full bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-magenta)] text-white glitch">
                  {isLogin ? 'Access Nexus' : 'Create Account'}
                </Button>
              </form>

              <p className="text-center text-sm text-[var(--text-secondary)]">
                {isLogin ? 'No account yet? ' : 'Already have one? '}
                <button onClick={() => setIsLogin(!isLogin)} className="text-[var(--accent-cyan)] underline">
                  {isLogin ? 'Sign up' : 'Login'}
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
                }
