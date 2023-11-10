import {
  IconArrowLeft,
  IconBuildingBank,
  IconChalkboard,
  IconFilePlus,
  IconSchool,
  IconUserCog,
  IconUserPlus,
  IconUsersPlus,
} from '@tabler/icons-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

export default function DialogAddIrs() {
  const [state, setState] = useState<boolean>(false)

  return (
    <Dialog onOpenChange={setState} open={state}>
      <DialogTrigger asChild>
        <Button variant='outline' className='px-3 shadow-none gap-2'>
          <IconFilePlus className='h-4 w-4' />
          Tambah Laporan
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tambah Laporan IRS</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

const DialogCreateOption = ({
  stateSetter,
}: {
  stateSetter: (value: 'option' | 'form' | 'upload' | 'student' | 'lecturer' | 'department' | 'admin') => void
}) => {
  return (
    <DialogDescription>
      <div className='flex gap-3 mt-4'>
        <Button
          variant='outline'
          className='flex-col border gap-2 aspect-square w-full h-auto'
          onClick={() => stateSetter('form')}
        >
          <IconUserPlus className='h-12 w-12' />
          <span>Buat manual</span>
        </Button>
        <Button
          variant='outline'
          className='flex-col border gap-2 aspect-square w-full h-auto'
          onClick={() => stateSetter('upload')}
        >
          <IconUsersPlus className='h-12 w-12' />
          <span>Buat sekaligus</span>
        </Button>
      </div>
    </DialogDescription>
  )
}

const DialogCreateManualOption = ({
  stateSetter,
}: {
  stateSetter: (value: 'option' | 'form' | 'upload' | 'student' | 'lecturer' | 'department' | 'admin') => void
}) => {
  return (
    <DialogDescription>
      <Button variant='outline' className='px-3 gap-2 w-max mt-4' size='sm' onClick={() => stateSetter('option')}>
        <IconArrowLeft size={16} /> Kembali
      </Button>
      <div className='gap-3 mt-4 grid grid-cols-2 grid-rows-2'>
        <Button
          variant='outline'
          className='flex-col border gap-2 aspect-square w-full h-full'
          onClick={() => stateSetter('student')}
        >
          <IconSchool className='h-12 w-12' />
          <span>Mahasiswa</span>
        </Button>
        <Button
          variant='outline'
          className='flex-col border gap-2 aspect-square w-full h-full'
          onClick={() => stateSetter('lecturer')}
        >
          <IconChalkboard className='h-12 w-12' />
          <span>Dosen</span>
        </Button>
        <Button
          variant='outline'
          className='flex-col border gap-2 aspect-square w-full h-full'
          onClick={() => stateSetter('department')}
        >
          <IconBuildingBank className='h-12 w-12' />
          <span>Departemen</span>
        </Button>
        <Button
          variant='outline'
          className='flex-col border gap-2 aspect-square w-full h-full'
          onClick={() => stateSetter('admin')}
        >
          <IconUserCog className='h-12 w-12' />
          <span>Operator</span>
        </Button>
      </div>
    </DialogDescription>
  )
}
