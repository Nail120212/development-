// app/auth/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Shield, Terminal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Light mode subtle background effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/30 to-purple-50/20 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="card">
          <CardHeader className="text-center space-y-3 pb-2">
            <div className="flex justify-center mb-1">
              <Shield className="w-14 h-14 text-[var(--accent-cyan)] animate-pulse" />
            </div>
            <CardTitle className="text-4xl font-black tracking-widest neon-text glitch">
              NEXUSGUARD
            </CardTitle>
            <CardDescription className="text-[var(--text-secondary)] text-base">
              Secure your scripts. Protect the nexus.
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-2">
            <div className="space-y-6">
              <div className="flex justify-center gap-6 mb-6">
                <Button
                  variant="ghost"
                  className={isLogin ? "text-[var(--accent-cyan)] border-b-2 border-[var(--accent-cyan)]" : "text-[var(--text-secondary)]"}
                  onClick={() => setIsLogin(true)}
                >
                  Login
                </Button>
                <Button
                  variant="ghost"
                  className={!isLogin ? "text-[var(--accent-cyan)] border-b-2 border-[var(--accent-cyan)]" : "text-[var(--text-secondary)]"}
                  onClick={() => setIsLogin(false)}
                >
                  Sign Up
                </Button>
              </div>

              <form className="space-y-5">
                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-[var(--text-secondary)]">Username</Label>
                    <div className="relative">
                      <Terminal className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--accent-cyan)]/70" />
                      <Input
                        id="username"
                        placeholder="nexus_dev"
                        className="pl-10 bg-white/60 border-[var(--border)] focus:border-[var(--accent-cyan)] text-[var(--text-primary)]"
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[var(--text-secondary)]">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="dev@nexusguard.dev"
                    className="bg-white/60 border-[var(--border)] focus:border-[var(--accent-cyan)] text-[var(--text-primary)]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-[var(--text-secondary)]">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="bg-white/60 border-[var(--border)] focus:border-[var(--accent-cyan)] text-[var(--text-primary)] pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--accent-cyan)]/70 hover:text-[var(--accent-cyan)]"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-magenta)] hover:opacity-90 text-white font-semibold tracking-wide shadow-lg shadow-[var(--glow-cyan)] transition-all hover:scale-[1.02] glitch"
                >
                  {isLogin ? 'Access Nexus' : 'Establish Connection'}
                </Button>
              </form>

              <p className="text-center text-sm text-[var(--text-secondary)]">
                {isLogin ? "New guardian? " : "Already in the nexus? "}
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-[var(--accent-cyan)] hover:underline font-medium"
                >
                  {isLogin ? "Sign up" : "Login"}
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
                    }
