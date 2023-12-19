'use client'

import { useQueries } from '@tanstack/react-query'

import DialogIrs from './components/dialog-create-irs'
import { columns } from './data/columns'

import { DataTable } from '@/components/data-table/data-table'
import Header from '@/components/header'
import { lecturerService } from '@/services/lecturer-service'

export default function IrsStudent() {
  const [listVerifyIrs] = useQueries({
    queries: [
      {
        queryKey: ['listVerifyIrs'],
        queryFn: lecturerService.getListValidationStudentIRS,
      },
    ],
  })

  // const lastIrs = listVerifyIrs?.data?.data.data.list[listVerifyIrs?.data?.data.data?.list.length - 1]

  const irsData = listVerifyIrs?.data?.data.data.list

  return (
    <main>
      <Header>
        <span className='font-bold text-xl'>Verifikasi IRS</span>
      </Header>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 w-full mb-2'>
        {/* <OverviewCard parameter='Semester saat ini' value={`Semester ${studentData?.semester}`} icon={IconArrowUp} />
        <OverviewCard
          parameter='Total SKS Diambil'
          value={`${studentData?.jumlahSksKumulatif} SKS`}
          icon={IconStatusChange}
        />
        <OverviewCard
          parameter='Status IRS Terakhir'
          value={latestVerificationStatus(lastIrs?.statusValidasi!)}
          icon={IconStatusChange}
        /> */}
      </div>
      <div className='flex w-full flex-col gap-4 bg-content p-4 rounded-md'>
        <div>
          <div className='mb-3'>
            <span className='font-medium'>Daftar Permintaan Verifikasi</span>
          </div>

          <div className='flex flex-col gap-3'>
            {listVerifyIrs.isLoading || !listVerifyIrs ? (
              <span>Memuat</span>
            ) : (
              <DataTable data={irsData ?? []} columns={columns} searchBy='nama' />
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
