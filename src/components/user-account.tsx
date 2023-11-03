'use client'

import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next-nprogress-bar'

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'

import { cn } from '@/lib/utils'

export default function UserAccount() {
  const { data: session } = useSession()
  const image = session?.user.image
  const name = session?.user.name
  const router = useRouter()
  const pathname = usePathname()

  return (
    <Button
      className={cn(
        'flex h-max grow items-center justify-center rounded-md dark:bg-primary/10 bg-gray-50 aspect-square md:aspect-auto p-3 text-sm font-medium dark:hover:bg-primary/25 hover:bg-muted hover:text-primary md:flex-none md:justify-start md:p-2 md:px-3 w-max md:w-full md:py-4 gap-4 text-stone-950 dark:text-white backdrop-blur-md',
        {
          'dark:bg-primary/25 bg-muted text-primary': pathname === '/dashboard/profile',
        }
      )}
      onClick={() => router.push('/dashboard/profile')}
    >
      <Avatar className='md:w-10 md:h-10 h-8 w-8'>
        <AvatarImage src={image} />
        <AvatarFallback>{name?.slice(0, 1)}</AvatarFallback>
      </Avatar>
      <div className='hidden md:flex w-full '>{name}</div>
    </Button>
  )
}
