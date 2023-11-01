'use client'

import { IconLogout } from '@tabler/icons-react'
import { signOut } from 'next-auth/react'

import { Button } from './ui/button'

export default function LogoutButton() {
  return (
    <Button
      className='flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-muted hover:text-primary md:flex-none md:justify-start md:p-2 md:px-3 w-full text-stone-950'
      onClick={() => signOut()}
    >
      <IconLogout className='w-6' />
      <div className='hidden md:flex w-full'>Keluar</div>
    </Button>
  )
}
