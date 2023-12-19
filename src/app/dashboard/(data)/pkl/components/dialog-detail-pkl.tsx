'use client'

import { DialogDescription } from '@radix-ui/react-dialog'
import { IconDownload } from '@tabler/icons-react'
import FileSaver from 'file-saver'
import { useState } from 'react'
import toast from 'react-hot-toast'

import { renderStatusValidation } from '@/components/status-badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { PKLListReponseDatumDto } from '@/lib/dto/student'

type DialogDetailPKLProps = {
  trigger: React.ReactNode
  data: PKLListReponseDatumDto
}

export default function DialogDetailPKL({ trigger, data }: DialogDetailPKLProps) {
  const [state, setState] = useState<boolean>(false)

  const handleDownload = (file: string, title: string) => {
    try {
      FileSaver.saveAs(file, title)
    } catch (e) {
      toast.error(`File tidak dapat diunduh. ${e}`)
    }
  }

  return (
    <Dialog onOpenChange={setState} open={state}>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Detail Laporan PKL</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <div className='space-y-3 w-full'>
            <div className='grid grid-cols-2 gap-2 grow'>
              <div className='flex gap-1 flex-col items-center p-2 border border-muted rounded-lg w-full'>
                <span className='opacity-50'>Semester</span>
                <span>{data.semester}</span>
              </div>
              <div className='flex gap-1 flex-col items-center p-2 border border-muted rounded-lg w-full'>
                <span className='opacity-50'>Nilai</span>
                <span>{data.nilai}</span>
              </div>
            </div>

            <div className='flex justify-between items-center space-y-1'>
              <span className='font-semibold text-sm'>Status Verifikasi</span>
              {renderStatusValidation(data.statusValidasi)}
            </div>

            <div className='flex justify-between items-center space-y-1'>
              <span className='font-semibold text-sm'>File Diunggah</span>
              <Button
                className='gap-2 w-max'
                variant='outline'
                size='sm'
                onClick={() =>
                  handleDownload(`${process.env.NEXT_PUBLIC_BASE_URL}/uploads/pkl/${data.filePkl}`, data.filePkl)
                }
              >
                <IconDownload size={14} /> <span>Unduh Berkas</span>
              </Button>
            </div>

            {/* {data.status === activeStatus.Aktif && (
              <div className='flex flex-col space-y-1'>
                <span className='font-semibold text-sm'>Catatan Verifikasi</span>
                <span>{data.verification_notes}</span>
              </div>
            )} */}
          </div>
        </DialogDescription>
        {/* {data.status !== activeStatus.accepted && (
          <>
            <Separator />
            <div>
              <div className='flex justify-between items-center space-y-1'>
                <span className='font-semibold text-sm'>Aksi</span>
                <Button variant='outline' size='sm' className='gap-2'>
                  <IconPencil size={14} /> Ubah Data
                </Button>
                {data.status === activeStatus.rejected && (
                  <Button variant='outline' size='sm' className='gap-2'>
                    <IconDownload size={14} /> Ajukan Ulang
                  </Button>
                )}
              </div>
            </div>
          </>
        )} */}
      </DialogContent>
    </Dialog>
  )
}
