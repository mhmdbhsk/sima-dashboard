'use client'

import { IconMoon, IconSun } from '@tabler/icons-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <Button
      suppressHydrationWarning
      variant='outline'
      className='gap-2 w-max px-3'
      size='sm'
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      <IconSun className='h-5 w-5 dark:hidden' />
      <IconMoon className='h-5 w-5 hidden dark:block' />

      <span className='capitalize' suppressHydrationWarning>
        {theme === 'light' ? 'Terang' : 'Gelap'}
      </span>
    </Button>
  )
}
