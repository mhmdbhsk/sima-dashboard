import { IconChalkboard, IconSchool, IconUsersGroup } from '@tabler/icons-react'
import { useQueries } from '@tanstack/react-query'

import { OverviewCard } from './card'

import { adminService } from '@/services/admin-service'

export default function AdminOverview() {
  const [student, lecturer] = useQueries({
    queries: [
      {
        queryKey: ['dashboardStudent'],
        queryFn: adminService.getStudentDashboardAdmin,
      },
      {
        queryKey: ['dashboardLecturer'],
        queryFn: adminService.getLecturerDashboardAdmin,
      },
    ],
  })

  const sumTotalUser = student.data?.data?.belumMemilikiAkun! + lecturer.data?.data?.belumMemilikiAkun!
  const sumTotalAccount = student.data?.data?.sudahMemilikiAkun! + lecturer.data?.data?.sudahMemilikiAkun!

  return (
    <div className='flex flex-col gap-2'>
      <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-2'>
        <OverviewCard parameter='Jumlah Total' value={sumTotalUser} icon={IconUsersGroup} />
        <OverviewCard parameter='Jumlah Total Akun' value={sumTotalAccount} icon={IconUsersGroup} />
        <OverviewCard parameter='Jumlah Mahasiswa' value={student.data?.data.belumMemilikiAkun} icon={IconSchool} />
        <OverviewCard
          parameter='Jumlah Akun Mahasiswa'
          value={student.data?.data.sudahMemilikiAkun}
          icon={IconSchool}
        />
        <OverviewCard parameter='Jumlah Dosen' value={lecturer.data?.data.belumMemilikiAkun} icon={IconChalkboard} />
        <OverviewCard
          parameter='Jumlah Akun Dosen'
          value={lecturer.data?.data.sudahMemilikiAkun}
          icon={IconChalkboard}
        />
      </div>
    </div>
  )
}
