'use client'

import DialogCreate from './components/dialog-create'
import { columns } from './data/columns'
import { roles } from './data/filters'
import data from './data/users.json'

import { DataTable } from '@/components/data-table/data-table'
import Header from '@/components/header'

export default function Users() {
  const userFilter = [{ field: 'role', label: 'Peran', options: roles }]

  return (
    <main>
      <Header>
        <span className='font-bold text-xl'>Pengguna</span>

        <div className='flex items-center space-x-1 rounded-md text-secondary-foreground'>
          <DialogCreate />
        </div>
      </Header>

      <div className='dark:bg-primary/10 bg-gray-50 h-full w-full py-4 px-6 rounded-md'>
        <DataTable data={data} columns={columns} searchBy='name' filters={userFilter} />
      </div>
    </main>
  )
}
