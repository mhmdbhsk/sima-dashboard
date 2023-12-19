import { IconPlus, IconArrowLeft, IconDownload } from '@tabler/icons-react'
import { useQuery } from '@tanstack/react-query'
import { Row } from '@tanstack/react-table'
import FileSaver from 'file-saver'
import { useState } from 'react'
import toast from 'react-hot-toast'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useUrlParams } from '@/hooks/useUrlParams'
import { AcademicDatum } from '@/lib/dto/student'
import { lecturerService } from '@/services/lecturer-service'
import { progressService } from '@/services/progress-service'
import { cn } from '@/utils'

interface StudentProgressRowActionsProps<TData> {
  row: Row<TData>
}

export function StudentProgressRowActions<TData>({ row }: StudentProgressRowActionsProps<TData>) {
  const nim: string = row.getValue('nim')
  const { setParam, removeParam, getParam } = useUrlParams()
  const [open, setOpen] = useState(false)
  const selectedNim = getParam('nim')

  const { data } = useQuery({
    queryFn: lecturerService.getListProgress,
    queryKey: ['progressList'],
  })
  const { data: detailProgress, isLoading: detailProgressLoading } = useQuery({
    queryFn: () => lecturerService.getDetailProgressByNim(selectedNim!),
    queryKey: ['detailProgress'],
    enabled: !!selectedNim,
  })

  const dataDetail = detailProgress?.data.data

  const dataAkademik = Object.keys(dataDetail?.dataAkademik ?? {}).map((key) => {
    return {
      semester: key,
      data: dataDetail?.dataAkademik[key as any],
    }
  })

  const handleDownload = (file: string, title: string) => {
    try {
      FileSaver.saveAs(file, title)
    } catch (e) {
      toast.error(`File tidak dapat diunduh. ${e}`)
    }
  }

  const convertDataAkademik = (semester: AcademicDatum[]) => {
    if (semester?.length > 2) {
      if (semester.find((item) => item.type === 'skripsi' && item.available)) {
        return 'skripsi'
      } else if (semester.find((item) => item.type === 'pkl' && item.available)) {
        return 'pkl'
      }
    } else {
      if (semester[0]?.available || semester[1].available) {
        return 'irskhs'
      } else {
        return 'cuti'
      }
    }
  }

  const semester: { semester: string; type: string | undefined; data: AcademicDatum[] | null | undefined }[] = []
  for (let i = 0; i < 14; i++) {
    if (i < dataAkademik.length) {
      const data = dataAkademik[i].data
      semester.push({
        semester: dataAkademik[i].semester,
        type: convertDataAkademik(data!),
        data: dataAkademik[i].data,
      })
    } else {
      semester.push({
        semester: `${i + 1}`,
        type: '',
        data: null,
      })
    }
  }

  const selectedSemester = getParam('semester')

  const renderContent = () => {
    if (selectedSemester) {
      const selectedSemesterData = semester.find((item) => item.semester === selectedSemester)

      console.log(selectedSemesterData, 'selected semester data')
      const filterIrs = selectedSemesterData?.data?.filter((item) => item.type === 'irs')
      const filterKhs = selectedSemesterData?.data?.filter((item) => item.type === 'khs')
      const filterPkl = selectedSemesterData?.data?.filter((item) => item.type === 'pkl')
      const filterSkripsi = selectedSemesterData?.data?.filter((item) => item.type === 'skripsi')

      return (
        <DialogContent className='max-w-2xl'>
          <Button variant='outline' className='px-3 gap-2 w-max' size='sm' onClick={() => removeParam('semester')}>
            <IconArrowLeft size={16} /> Kembali
          </Button>
          <DialogHeader>
            <DialogTitle>Detail Progress Semester {selectedSemesterData?.semester}</DialogTitle>
          </DialogHeader>

          <Tabs defaultValue='irs' className='w-full'>
            <TabsList>
              <TabsTrigger value='irs'>IRS</TabsTrigger>
              <TabsTrigger value='khs'>KHS</TabsTrigger>
              <TabsTrigger value='pkl'>PKL</TabsTrigger>
              <TabsTrigger value='skripsi'>Skripsi</TabsTrigger>
            </TabsList>

            <TabsContent value='irs'>
              {filterIrs && filterIrs?.[0]?.available ? (
                <div className='flex flex-col gap-3'>
                  <div className='flex gap-3'>
                    <div className='flex gap-1 flex-col items-center p-2 border border-muted rounded-lg w-full'>
                      <span className='font-semibold'>Semester</span>
                      <span className='text-right'>{filterIrs?.[0].semester}</span>
                    </div>
                    <div className='flex gap-1 flex-col items-center p-2 border border-muted rounded-lg w-full'>
                      <span className='font-semibold'>SKS</span>
                      <span className='text-right'>{filterIrs?.[0].jumlahSks}</span>
                    </div>
                  </div>

                  <Button
                    className='gap-2 w-max'
                    variant='outline'
                    size='sm'
                    onClick={() =>
                      handleDownload(
                        `${process.env.NEXT_PUBLIC_BASE_URL}/public/documents/irs/${filterIrs?.[0]?.fileIrs}`,
                        `${filterIrs?.[0]?.fileIrs}`
                      )
                    }
                  >
                    <IconDownload size={14} /> <span>Unduh Berkas</span>
                  </Button>
                </div>
              ) : (
                <span>Tidak tersedia</span>
              )}
            </TabsContent>
            <TabsContent value='khs'>
              {filterKhs && filterKhs?.[0]?.available ? (
                <div className='flex flex-col gap-3'>
                  <div className='flex gap-3'>
                    <div className='flex gap-1 flex-col items-center p-2 border border-muted rounded-lg w-full'>
                      <span className='font-semibold'>IP semester</span>
                      <span className='text-right'>{filterKhs?.[0].ips}</span>
                    </div>
                    <div className='flex gap-1 flex-col items-center p-2 border border-muted rounded-lg w-full'>
                      <span className='font-semibold'>SKS semester</span>
                      <span className='text-right'>{filterKhs?.[0].jumlahSksSemester}</span>
                    </div>
                    <div className='flex gap-1 flex-col items-center p-2 border border-muted rounded-lg w-full'>
                      <span className='font-semibold'>IP kumulatif</span>
                      <span className='text-right'>{filterKhs?.[0].ipk}</span>
                    </div>
                    <div className='flex gap-1 flex-col items-center p-2 border border-muted rounded-lg w-full'>
                      <span className='font-semibold'>SKS kumulatif</span>
                      <span className='text-right'>{filterKhs?.[0].jumlahSksKumulatif}</span>
                    </div>
                  </div>

                  <Button
                    className='gap-2 w-max'
                    variant='outline'
                    size='sm'
                    onClick={() =>
                      handleDownload(
                        `${process.env.NEXT_PUBLIC_BASE_URL}/public/documents/irs/${filterKhs?.[0]?.fileKhs}`,
                        `${filterKhs?.[0]?.fileKhs}`
                      )
                    }
                  >
                    <IconDownload size={14} /> <span>Unduh Berkas</span>
                  </Button>
                </div>
              ) : (
                <span>Tidak tersedia</span>
              )}
            </TabsContent>
            <TabsContent value='pkl'>
              {filterPkl && filterPkl?.[0]?.available ? (
                <div className='flex flex-col gap-3'>
                  <div className='flex gap-3'>
                    <div className='flex gap-1 flex-col items-center p-2 border border-muted rounded-lg w-full'>
                      <span className='font-semibold'>Semester</span>
                      <span className='text-right'>{filterPkl?.[0].semester}</span>
                    </div>
                    <div className='flex gap-1 flex-col items-center p-2 border border-muted rounded-lg w-full'>
                      <span className='font-semibold'>SKS</span>
                      <span className='text-right'>{filterPkl?.[0].jumlahSks}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <span>Tidak tersedia</span>
              )}
            </TabsContent>
            <TabsContent value='skripsi'>
              {filterSkripsi && filterSkripsi?.[0]?.available ? (
                <div className='flex flex-col gap-3'>
                  <div className='flex gap-3'>
                    <div className='flex gap-1 flex-col items-center p-2 border border-muted rounded-lg w-full'>
                      <span className='font-semibold'>Semester</span>
                      <span className='text-right'>{filterSkripsi?.[0].semester}</span>
                    </div>
                    <div className='flex gap-1 flex-col items-center p-2 border border-muted rounded-lg w-full'>
                      <span className='font-semibold'>SKS</span>
                      <span className='text-right'>{filterSkripsi?.[0].jumlahSks}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <span>Tidak tersedia</span>
              )}
            </TabsContent>
          </Tabs>
        </DialogContent>
      )
    } else {
      return (
        <DialogContent className='max-w-max'>
          <DialogHeader>
            <DialogTitle>Detail Mahasiswa</DialogTitle>
          </DialogHeader>

          <div>
            <div className='flex flex-col my-6'>
              <span className='font-bold text-xl text-center'>Progress Perkembangan Studi Mahasiswa Informatika</span>
              <span className='font-bold text-xl text-center'>Fakultas Sains dan Matematika UNDIP Semarang</span>
            </div>

            <div className='flex gap-4'>
              <Avatar className='h-56 w-56 rounded-xl aspect-square'>
                <AvatarImage src={detailProgress?.data.data.foto} className='rounded-xl' />
                <AvatarFallback className='rounded-xl'>{detailProgress?.data.data.nama?.slice(0, 1)}</AvatarFallback>
              </Avatar>
              <div className='flex flex-col gap-3 flex-1'>
                <div className='flex gap-1 flex-col items-center p-2 border border-muted rounded-lg w-full'>
                  <span className='font-semibold'>Nama</span>
                  {detailProgressLoading ? (
                    <Skeleton className='h-3 w-9' />
                  ) : (
                    <span className='text-right'>{detailProgress?.data.data.nama}</span>
                  )}
                </div>
                <div className='flex gap-1 flex-col items-center p-2 border border-muted rounded-lg w-full'>
                  <span className='font-semibold'>NIM</span>
                  {detailProgressLoading ? (
                    <Skeleton className='h-3 w-9' />
                  ) : (
                    <span className='text-right'>{detailProgress?.data.data.nim}</span>
                  )}
                </div>
                <div className='flex gap-1 flex-col items-center p-2 border border-muted rounded-lg w-full'>
                  <span className='font-semibold'>Angkatan</span>
                  {detailProgressLoading ? (
                    <Skeleton className='h-3 w-9' />
                  ) : (
                    <span className='text-right'>{detailProgress?.data.data.angkatan}</span>
                  )}
                </div>
                <div className='flex gap-1 flex-col items-center p-2 border border-muted rounded-lg w-full'>
                  <span className='font-semibold'>Dosen Wali</span>
                  {detailProgressLoading ? (
                    <Skeleton className='h-3 w-9' />
                  ) : (
                    <span className='text-right'>{detailProgress?.data.data.namaDoswal}</span>
                  )}
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-4 justify-between w-full mt-6'>
              {detailProgressLoading ? (
                <Skeleton className='h-3 w-9' />
              ) : (
                <div className='gap-2 grid grid-cols-7 grid-rows-2'>
                  {semester.map((item) => (
                    <div
                      key={item.semester}
                      className={cn(
                        'p-4 border rounded-md w-14 h-14 flex items-center justify-center text-white font-bold cursor-pointer',
                        item.type === 'irskhs' && 'bg-blue-500',
                        item.type === 'cuti' && 'bg-red-500',
                        item.type === '' && 'bg-red-500',
                        item.type === 'pkl' && 'bg-orange-500',
                        item.type === 'skripsi' && 'bg-green-500'
                      )}
                      onClick={() => setParam('semester', item.semester)}
                    >
                      {item.semester}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      )
    }
  }

  return (
    <div>
      <Dialog
        open={open}
        onOpenChange={() => {
          setOpen(!open)
          if (open) {
            removeParam('nim')
          }
        }}
      >
        <DialogTrigger asChild>
          <Button variant='outline' size='sm' onClick={() => setParam('nim', nim)}>
            Detail
          </Button>
        </DialogTrigger>
        {renderContent()}
      </Dialog>
    </div>
  )
}
