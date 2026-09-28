'use client'
import { useEffect, useState } from 'react'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  useEffect(() => { const saved = localStorage.getItem('theme') as 'light' | 'dark' | null; const value = saved || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'); setTheme(value); document.documentElement.dataset.theme = value }, [])
  function toggle() { const next = theme === 'dark' ? 'light' : 'dark'; setTheme(next); localStorage.setItem('theme', next); document.documentElement.dataset.theme = next }
  return <>{children}<button aria-label="Toggle color theme" className="theme-toggle theme-floating" onClick={toggle} style={{position:'fixed',right:20,bottom:20,zIndex:5}}>{theme === 'dark' ? 'Light' : 'Dark'}</button></>
}
