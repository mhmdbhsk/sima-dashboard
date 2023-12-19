import { IconUserPlus, IconUsersPlus } from '@tabler/icons-react'
import { useState } from 'react'

import { DialogCreateUpload } from './dialog-create-bulk'
import { DialogCreateStudentForm } from './dialog-create-student'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

export default function DialogCreate() {
  const [state, setState] = useState<'option' | 'upload' | 'student'>('option')

  const renderContent = () => {
    switch (state) {
      case 'option':
        return <DialogCreateOption stateSetter={setState} />
      case 'student':
        return <DialogCreateStudentForm stateSetter={setState} />
      case 'upload':
        return <DialogCreateUpload stateSetter={setState} />
    }
  }

  return (
    <Dialog onOpenChange={() => setState('option')}>
      <DialogTrigger asChild>
        <Button variant='outline' className='px-3 shadow-none gap-2'>
          <IconUserPlus className='h-4 w-4' />
          Tambah Pengguna
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tambah Pengguna</DialogTitle>
          {renderContent()}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

const DialogCreateOption = ({ stateSetter }: { stateSetter: (value: 'option' | 'upload' | 'student') => void }) => {
  return (
    <DialogDescription>
      <div className='flex gap-3 mt-4'>
        <Button
          variant='outline'
          className='flex-col border gap-2 aspect-square w-full h-auto'
          onClick={() => stateSetter('student')}
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
