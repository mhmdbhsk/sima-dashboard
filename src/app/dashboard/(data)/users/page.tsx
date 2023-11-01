import { IconChevronDown, IconPlus, IconUserPlus, IconUsersPlus } from '@tabler/icons-react'

import { DataTable } from '@/components/data-table'
import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'

export default async function Users() {
  return (
    <main>
      <div className='mb-2 flex h1-15 items-center justify-start rounded-md px-6 md:h-20 bg-primary/10 justify-between'>
        <span className='font-medium'>Pengguna</span>

        {/* <Button variant='outline' className='ml-auto gap-2'>
          <IconPlus className='h-5 w-5' />
          <span>Add user</span>
        </Button> */}

        <div className='flex items-center space-x-1 rounded-md text-secondary-foreground'>
          <Button variant='outline' className='px-3 shadow-none'>
            <IconUserPlus className='mr-2 h-4 w-4' />
            Tambah Pengguna
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' className='px-2 shadow-none'>
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
      </div>
      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4' />
      <div className='dark:bg-primary/10 bg-gray-50 h-full px-6 rounded-md'>
        <DataTable />
        <ThemeToggle />
      </div>
    </main>
  )
}
