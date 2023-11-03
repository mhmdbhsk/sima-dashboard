'use client'

import { IconLogout } from '@tabler/icons-react'
import { signOut } from 'next-auth/react'

import { Button } from './ui/button'

export default function LogoutButton() {
  return (
    <Button
      className='flex aspect-square w-max md:aspect-auto h-14 md:h-12 grow items-center justify-center gap-2 rounded-md dark:bg-primary/10 bg-gray-50 p-3 text-sm font-medium dark:hover:bg-primary/25 hover:bg-muted hover:text-primary md:flex-none md:justify-start md:p-2 md:px-3 md:w-full text-stone-950 dark:text-white backdrop-blur-md'
      onClick={() => signOut()}
    >
      <IconLogout className='w-6' />
      <div className='hidden md:flex w-full'>Keluar</div>
    </Button>
  )
}
