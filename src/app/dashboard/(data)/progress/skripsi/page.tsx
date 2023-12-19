'use client'

import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import Header from '@/components/header'
import { Table, TableBody, TableHead, TableRow } from '@/components/ui/table'
import { progressService } from '@/services/progress-service'

export default function SkripsiPage() {
  const [loading, setLoading] = useState<boolean>(false)

  const { data } = useQuery({
    queryFn: progressService.getRecapSkripsi,
    queryKey: ['recapSkripsi'],
  })

  const rekapSkripsi = data?.data.data

  return (
    <main>
      <Header>
        <span className='font-bold text-xl'>Skripsi</span>
      </Header>

      <div className='dark:bg-primary/10 bg-gray-50 h-full w-full py-4 px-6 rounded-md'>
        <div className='overflow-x-auto relative my-10'>
          <h1 className='text-center font-bold text-xl mb-8'>
            Rekap Progress Skripsi Mahasiswa Informatika Fakultas Sains dan Matematika UNDIP SEMARANG
          </h1>
          {loading ? (
            <div className='h-full flex justify-center items-center'>Memuat</div>
          ) : (
            <div className='w-full overflow-auto border rounded-lg'>
              <Table className='w-full text-sm text-gray-500 dark:text-gray-400 text-center'>
                <TableHead className='text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400 w-full px-0'>
                  <TableRow className='w-full flex flex-1'>
                    {rekapSkripsi?.map((data) => (
                      <TableHead key={data.angkatan} className='py-3 px-6 w-full text-center border-r last:border-r-0'>
                        {data.angkatan}
                      </TableHead>
                    ))}
                  </TableRow>
                  <TableRow className='w-full flex flex-1'>
                    {rekapSkripsi?.map(() => (
                      <>
                        <TableHead className='py-3 px-6 w-full text-center border-r'>Sudah</TableHead>
                        <TableHead className='py-3 px-6 w-full text-center border-r last:border-r-0'>Belum</TableHead>
                      </>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 flex flex-1'>
                    {rekapSkripsi?.map((data) => (
                      <>
                        <TableHead className='py-3 px-6 w-full text-center border-r'>{data.lulus}</TableHead>
                        <TableHead className='py-3 px-6 w-full text-center border-r last:border-r-0'>
                          {data.belum}
                        </TableHead>
                      </>
                    ))}
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          )}
          {/* <StatusPKLMahasiswa isRekap endpoint={endpoint} /> */}
        </div>
      </div>
    </main>
  )
}
