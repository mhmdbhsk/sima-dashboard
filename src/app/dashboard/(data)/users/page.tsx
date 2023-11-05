'use client'

import { IconChevronDown, IconUserPlus, IconUsersPlus } from '@tabler/icons-react'

import { roles } from './data/filters'
import data from './data/users.json'

import { columns } from '@/app/dashboard/(data)/users/data/columns'
import { DataTable } from '@/components/data-table/data-table'
import Header from '@/components/header'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

export default function Users() {
  const userFilter = [{ field: 'role', label: 'Peran', options: roles }]

  return (
    <main>
      <Header>
        <span className='font-bold text-xl'>Pengguna</span>

        <div className='flex items-center space-x-1 rounded-md text-secondary-foreground'>
          <Button variant='outline' className='px-3 shadow-none'>
            <IconUserPlus className='mr-2 h-4 w-4' />
            Tambah Pengguna
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' className='px-2 shadow-none aspect-square'>
                <IconChevronDown className='h-4 w-4 text-secondary-foreground' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' alignOffset={-5} className='w-[200px]' forceMount>
              <DropdownMenuItem>
                <IconUsersPlus className='mr-2 h-4 w-4' /> Tambahkan Sekaligus
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </Header>

      <div className='dark:bg-primary/10 bg-gray-50 h-full w-full py-4 px-6 rounded-md'>
        <DataTable data={data} columns={columns} searchBy='name' filters={userFilter} />
      </div>
    </main>
  )
}
