'use client'

import { useQuery } from '@tanstack/react-query'

import { columns } from './data/columns'
// import data from './data/users.json'

import { DataTable } from '@/components/data-table/data-table'
import Header from '@/components/header'
import { progressService } from '@/services/progress-service'

export default function Users() {
  // const userFilter = [{ field: 'role', label: 'Peran', options: roles }]

  const { data } = useQuery({
    queryFn: progressService.getListProgress,
    queryKey: ['progressList'],
  })

  return (
    <main>
      <Header>
        <span className='font-bold text-xl'>Daftar Mahasiswa</span>
      </Header>

      <div className='dark:bg-primary/10 bg-gray-50 h-full w-full py-4 px-6 rounded-md'>
        {data?.data.data.list && <DataTable data={data?.data.data.list} columns={columns} searchBy='nama' />}
      </div>
    </main>
  )
}
