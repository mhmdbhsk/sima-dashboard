'use client'

import { TablerIconsProps } from '@tabler/icons-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/utils'

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
              'flex h-14 w-14 aspect-square md:aspect-auto md:w-full md:h-12 grow items-center justify-center gap-2 rounded-md dark:bg-primary/10 bg-gray-50 p-3 text-sm font-medium dark:hover:bg-primary/25 hover:bg-muted hover:text-primary md:flex-none md:justify-start md:p-2 md:px-3 transition-colors backdrop-blur-md',
              {
                'dark:bg-primary/25 bg-muted text-primary': pathname === link.href,
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
