"use client"

import * as React from 'react'
import { themes, type ThemeName, type ThemeMode } from '@/lib/themes'

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: ThemeName
  defaultMode?: ThemeMode
  storageKey?: string
}

type ThemeProviderState = {
  theme: ThemeName
  mode: ThemeMode
  setTheme: (theme: ThemeName) => void
  setMode: (mode: ThemeMode) => void
  toggleMode: () => void
}

const initialState: ThemeProviderState = {
  theme: 'default',
  mode: 'light',
  setTheme: () => null,
  setMode: () => null,
  toggleMode: () => null,
}

const ThemeProviderContext = React.createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = 'default',
  defaultMode = 'light',
  storageKey = 'ui-theme',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = React.useState<ThemeName>(defaultTheme)
  const [mode, setMode] = React.useState<ThemeMode>(defaultMode)

  React.useEffect(() => {
    const root = window.document.documentElement

    // Load saved theme and mode from localStorage
    const savedTheme = localStorage.getItem(storageKey) as ThemeName
    const savedMode = localStorage.getItem(`${storageKey}-mode`) as ThemeMode

    if (savedTheme && themes[savedTheme]) {
      setTheme(savedTheme)
    }

    if (savedMode) {
      setMode(savedMode)
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setMode(prefersDark ? 'dark' : 'light')
    }
  }, [storageKey])

  React.useEffect(() => {
    const root = window.document.documentElement

    // Remove all theme and mode classes
    root.classList.remove('light', 'dark')
    Object.keys(themes).forEach(t => root.classList.remove(t))

    // Add current theme and mode
    root.classList.add(theme, mode)

    // Apply CSS variables
    const currentTheme = themes[theme][mode]
    Object.entries(currentTheme).forEach(([key, value]) => {
      const cssVar = `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`
      root.style.setProperty(cssVar, value)
    })

    // Save to localStorage
    localStorage.setItem(storageKey, theme)
    localStorage.setItem(`${storageKey}-mode`, mode)
  }, [theme, mode, storageKey])

  const toggleMode = React.useCallback(() => {
    setMode(prevMode => prevMode === 'light' ? 'dark' : 'light')
  }, [])

  const value = {
    theme,
    mode,
    setTheme: (newTheme: ThemeName) => {
      setTheme(newTheme)
    },
    setMode: (newMode: ThemeMode) => {
      setMode(newMode)
    },
    toggleMode,
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = React.useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider')

  return context
}
