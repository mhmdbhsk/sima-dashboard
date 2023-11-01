'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next-nprogress-bar'

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'

export default function UserAccount() {
  const { data: session } = useSession()
  const image = session?.user.image
  const name = session?.user.name
  const router = useRouter()

  return (
    <Button
      className='flex h-max grow items-center justify-center rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-muted hover:text-primary md:flex-none md:justify-start md:p-2 md:px-3 w-full text-stone-950 py-5 gap-4'
      onClick={() => router.push('/dashboard/profile')}
    >
      <Avatar>
        <AvatarImage src={image} />
        <AvatarFallback>{name?.slice(0, 1)}</AvatarFallback>
      </Avatar>
      <div className='hidden md:flex w-full'>{name}</div>
    </Button>
  )
}
