'use client'

import { IconFileInvoice, IconHome, IconSettings, IconTriangleSquareCircle, IconUsersGroup } from '@tabler/icons-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'

const links = [
  { name: 'Home', href: '/dashboard', icon: IconHome },
  { name: 'Products', href: '/dashboard/products', icon: IconTriangleSquareCircle },
  {
    name: 'Invoices',
    href: '/dashboard/invoices',
    icon: IconFileInvoice,
  },
  { name: 'Customers', href: '/dashboard/customers', icon: IconUsersGroup },
  { name: 'Settings', href: '/dashboard/settings', icon: IconSettings },
]

export default function NavLinks() {
  const pathname = usePathname()

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon
        return (
          <Link
            key={link.name}
            href={link.href}
            className={cn(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-orange-100 hover:text-primary md:flex-none md:justify-start md:p-2 md:px-3 transition-colors',
              {
                'bg-orange-100 text-primary': pathname === link.href,
              }
            )}
          >
            <LinkIcon className='w-6' />
            <p className='hidden md:block'>{link.name}</p>
          </Link>
        )
      })}
    </>
  )
}
