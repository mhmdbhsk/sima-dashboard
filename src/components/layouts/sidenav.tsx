'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { Suspense } from 'react'

import NavLinks from './nav-links'
import LogoutButton from '../logout-button'
import UserAccount from '../user-account'

import { navigationLists } from '@/config'

export default function SideNav() {
  const { data: session } = useSession()

  const navigationLinks = (session: 'admin' | 'department' | 'student' | 'lecturer') => {
    switch (session) {
      case 'admin':
        return navigationLists.operator
      case 'department':
        return navigationLists.department
      case 'student':
        return navigationLists.student
      default:
        return navigationLists.lecturer
    }
  }

  return (
    <div className='flex h-full flex-col px-3 py-2 md:px-2'>
      <Link className='mb-2 flex h1-15 items-center justify-center rounded-md bg-primary p-4 md:h-20' href='/'>
        <div className='text-white flex items-center gap-4'>
          <Image src='/images/logo-filled.svg' alt='SIMA Logo' width={32} height={32} />
          <div className='flex flex-col'>
            <span className='font-bold'>SIMA</span>
            <span className='text-xs'>Dashboard</span>
          </div>
        </div>
      </Link>
      <div className='flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2'>
        <Suspense fallback='Loading...'>
          {session?.user.role && <NavLinks links={navigationLinks(session.user.role)} />}
        </Suspense>
        <div className='hidden h-auto w-full grow rounded-md bg-gray-50 md:block' />
        <UserAccount />
        <LogoutButton />
      </div>
    </div>
  )
}
