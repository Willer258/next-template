"use client"

import * as React from 'react'
import { useTheme } from '@/hooks/use-theme'
import { themes, type ThemeName } from '@/lib/themes'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Palette, Check, Moon, Sun } from 'lucide-react'
import { cn } from '@/lib/utils'

export function ThemeCustomizer() {
  const { theme, mode, setTheme, toggleMode } = useTheme()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Palette className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Customize theme</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Customize Theme</h4>
            <p className="text-sm text-muted-foreground">
              Pick a style and color for your components
            </p>
          </div>

          <div className="space-y-3">
            <div className="space-y-2">
              <Label className="text-xs">Mode</Label>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={mode === 'light' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => toggleMode()}
                  className="w-full justify-start"
                >
                  <Sun className="mr-2 h-4 w-4" />
                  Light
                  {mode === 'light' && <Check className="ml-auto h-4 w-4" />}
                </Button>
                <Button
                  variant={mode === 'dark' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => toggleMode()}
                  className="w-full justify-start"
                >
                  <Moon className="mr-2 h-4 w-4" />
                  Dark
                  {mode === 'dark' && <Check className="ml-auto h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs">Color</Label>
              <div className="grid grid-cols-3 gap-2">
                {Object.entries(themes).map(([key, value]) => {
                  const themeName = key as ThemeName
                  const isActive = theme === themeName

                  return (
                    <Button
                      key={key}
                      variant={isActive ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setTheme(themeName)}
                      className={cn(
                        'w-full justify-start relative',
                        isActive && 'border-2 border-primary'
                      )}
                    >
                      <div
                        className="mr-2 h-4 w-4 rounded-full border"
                        style={{
                          backgroundColor: `oklch(${value.light.primary})`,
                        }}
                      />
                      {value.name}
                      {isActive && <Check className="ml-auto h-4 w-4" />}
                    </Button>
                  )
                })}
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t">
              <p className="text-xs text-muted-foreground">
                Theme changes are saved automatically
              </p>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
