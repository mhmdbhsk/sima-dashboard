'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { Suspense } from 'react'

import NavLinks from './nav-links'
import LogoutButton from '../logout-button'
import UserAccount from '../user-account'

import navigationConfig from '@/configs/navigation-config'

export default function SideNav() {
  const { data: session } = useSession()

  const navigationLinks = (session: 'admin' | 'department' | 'student' | 'lecturer') => {
    switch (session) {
      case 'admin':
        return navigationConfig.operator
      case 'department':
        return navigationConfig.department
      case 'student':
        return navigationConfig.student
      default:
        return navigationConfig.lecturer
    }
  }

  return (
    <div className='flex h-full flex-col px-3 py-2 md:px-2'>
      <Link className='mb-2 flex h1-15 items-end justify-start rounded-md bg-primary p-4 md:h-20' href='/'>
        <div className='w-32 text-white md:w-40'>dashboard</div>
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
