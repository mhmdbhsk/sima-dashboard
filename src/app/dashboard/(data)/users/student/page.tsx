'use client'

import { useQuery } from '@tanstack/react-query'

import DialogCreate from './components/dialog-create'
import { columns } from './data/columns'

import { DataTable } from '@/components/data-table/data-table'
import Header from '@/components/header'
import { adminService } from '@/services/admin-service'

export default function Users() {
  const { data } = useQuery({
    queryKey: ['students'],
    queryFn: adminService.getStudentsList,
  })

  return (
    <main>
      <Header>
        <span className='font-bold text-xl'>Akun Mahasiswa</span>

        <div className='flex items-center space-x-1 rounded-md text-secondary-foreground'>
          <DialogCreate />
        </div>
      </Header>

      <div className='dark:bg-primary/10 bg-gray-50 h-full w-full py-4 px-6 rounded-md'>
        <DataTable data={data?.data.list ?? []} columns={columns} searchBy='name' />
      </div>
    </main>
  )
}
