'use client'

import { DialogDescription } from '@radix-ui/react-dialog'
import { IconDownload, IconPencil } from '@tabler/icons-react'
import FileSaver from 'file-saver'
import { useState } from 'react'
import toast from 'react-hot-toast'

import { renderStatus } from '@/components/status-badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { irsDummyDataType, irsStatus } from '@/config/dummy-data'
import { dateFormatter } from '@/utils/date'

type DialogDetailIRSProps = {
  trigger: React.ReactNode
  data: irsDummyDataType
}

export default function DialogDetailIRS({ trigger, data }: DialogDetailIRSProps) {
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
          <DialogTitle>Detail Laporan IRS</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <div className='space-y-3 w-full'>
            <div className='flex gap-2 grow'>
              <div className='flex gap-1 flex-col items-center p-2 border border-muted rounded-lg w-full'>
                <span className='opacity-50'>Semester</span>
                <span>{data.semester}</span>
              </div>
              <div className='flex gap-1 flex-col items-center p-2 border border-muted rounded-lg w-full'>
                <span className='opacity-50'>Jumlah SKS</span>
                <span>{data.sks}</span>
              </div>
            </div>

            <div className='flex justify-between items-center space-y-1'>
              <span className='font-semibold text-sm'>Tanggal Verifikasi</span>
              <span className='opacity-50'>{dateFormatter(data.updatedAt)}</span>
            </div>

            <div className='flex justify-between items-center space-y-1'>
              <span className='font-semibold text-sm'>Status</span>
              {renderStatus(data.status)}
            </div>

            <div className='flex justify-between items-center space-y-1'>
              <span className='font-semibold text-sm'>File Diunggah</span>
              <Button
                className='gap-2 w-max'
                variant='outline'
                size='sm'
                onClick={() =>
                  handleDownload(
                    `http://localhost:3000/${data.file}`,
                    `${data.id_student}-${data.semester}-${data.file}`
                  )
                }
              >
                <IconDownload size={14} /> <span>Unduh Berkas</span>
              </Button>
            </div>

            {data.status === irsStatus.rejected && (
              <div className='flex flex-col space-y-1'>
                <span className='font-semibold text-sm'>Catatan Verifikasi</span>
                <span>{data.verification_notes}</span>
              </div>
            )}
          </div>
        </DialogDescription>
        {data.status !== irsStatus.accepted && (
          <>
            <Separator />
            <div>
              <div className='flex justify-between items-center space-y-1'>
                <span className='font-semibold text-sm'>Aksi</span>
                <Button variant='outline' size='sm' className='gap-2'>
                  <IconPencil size={14} /> Ubah Data
                </Button>
                {data.status === irsStatus.rejected && (
                  <Button variant='outline' size='sm' className='gap-2'>
                    <IconDownload size={14} /> Ajukan Ulang
                  </Button>
                )}
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
