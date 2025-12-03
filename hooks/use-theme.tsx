"use client"

import * as React from 'react'
import { themes, type ThemeName, type ThemeMode } from '@/lib/themes'

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: ThemeName
  defaultMode?: ThemeMode | 'system'
  storageKey?: string
}

type ThemeProviderState = {
  theme: ThemeName
  mode: ThemeMode
  setTheme: (theme: ThemeName) => void
  setMode: (mode: ThemeMode | 'system') => void
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
  defaultMode = 'system',
  storageKey = 'ui-theme',
  ...props
}: ThemeProviderProps) {
  const [theme, setThemeState] = React.useState<ThemeName>(defaultTheme)
  const [mode, setModeState] = React.useState<ThemeMode>(() => {
    // Server-side rendering: return light as default to avoid hydration mismatch
    if (typeof window === 'undefined') return 'light'

    // Check if we have a saved mode
    const savedMode = localStorage.getItem(`${storageKey}-mode`)
    if (savedMode === 'light' || savedMode === 'dark') {
      return savedMode
    }

    // Check system preference
    if (defaultMode === 'system' || defaultMode === undefined) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }

    return defaultMode
  })

  // Initialize theme from localStorage
  React.useEffect(() => {
    const savedTheme = localStorage.getItem(storageKey) as ThemeName
    if (savedTheme && themes[savedTheme]) {
      setThemeState(savedTheme)
    }
  }, [storageKey])

  // Listen to system theme changes
  React.useEffect(() => {
    const savedMode = localStorage.getItem(`${storageKey}-mode`)
    if (savedMode !== 'light' && savedMode !== 'dark') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

      const handleChange = (e: MediaQueryListEvent) => {
        setModeState(e.matches ? 'dark' : 'light')
      }

      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    }
  }, [storageKey])

  // Apply theme and mode
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

  const setTheme = React.useCallback((newTheme: ThemeName) => {
    setThemeState(newTheme)
  }, [])

  const setMode = React.useCallback((newMode: ThemeMode | 'system') => {
    if (newMode === 'system') {
      const systemMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      setModeState(systemMode)
      localStorage.removeItem(`${storageKey}-mode`)
    } else {
      setModeState(newMode)
    }
  }, [storageKey])

  const toggleMode = React.useCallback(() => {
    setModeState(prevMode => prevMode === 'light' ? 'dark' : 'light')
  }, [])

  const value = {
    theme,
    mode,
    setTheme,
    setMode,
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
