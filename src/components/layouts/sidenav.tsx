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
    <div className='flex h-max md:h-full flex-col px-3 py-2 md:px-2'>
      <Link
        className='mb-2 flex items-center justify-center rounded-md bg-primary px-8 p-4 md:h-20 backdrop-blur-md'
        href='/'
      >
        <div className='text-white gap-4 flex'>
          <Image src='/images/logo-filled.svg' alt='SIMA Logo' width={28} height={28} />
          {/* <div className='flex gap-1 items-center'>
            <span className='font-medium text-xs'>SIMA</span>
            <span className='text-xs'>Dashboard</span>
          </div> */}
        </div>
      </Link>
      <div className='flex md:grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2 overflow-x-auto'>
        <Suspense fallback='Loading...'>
          {session?.user.role && <NavLinks links={navigationLinks(session.user.role)} />}
        </Suspense>
        <div className='h-auto w-full grow rounded-md dark:bg-primary/10 bg-gray-50 backdrop-blur-md' />
        <UserAccount />
        <LogoutButton />
      </div>
    </div>
  )
}
