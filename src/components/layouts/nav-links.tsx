'use client'

import { TablerIconsProps } from '@tabler/icons-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'

type NavLinksProps = { links: { name: string; href: string; icon: (props: TablerIconsProps) => JSX.Element }[] }

export default function NavLinks({ links }: NavLinksProps) {
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
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-muted hover:text-primary md:flex-none md:justify-start md:p-2 md:px-3 transition-colors',
              {
                'bg-muted text-primary': pathname === link.href,
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
