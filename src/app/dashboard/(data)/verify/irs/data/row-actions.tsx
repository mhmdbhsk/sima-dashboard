'use client'

import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Row } from '@tanstack/react-table'
import { useState } from 'react'
import toast from 'react-hot-toast'

import DialogDetailIRS from '../components/dialog-detail-irs'

import { ConfirmationAlert } from '@/components/confirmation-alert'
import { Button } from '@/components/ui/button'
import { GetListIRSValidationResponseListDto } from '@/lib/dto/lecturer'
import { lecturerService } from '@/services/lecturer-service'

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function VerifyIrsRowActions<TData>({ row }: DataTableRowActionsProps<TData>) {
  const nim = (row.original as any).nim
  const data = row.original as GetListIRSValidationResponseListDto
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [open, setOpen] = useState<boolean>(false)
  const [state, setState] = useState<boolean>(false)

  const queryClient = useQueryClient()

  const validateIrs = useMutation({
    mutationKey: ['validateIrs'],
    mutationFn: async () => {
      setIsSubmitting(true)

      const payload = new FormData()
      payload.append('nim', data.nim)
      payload.append('semester', data.semester)
      payload.append('status', data.statusAktif)
      payload.append('jumlahSks', data.jumlahSks)
      payload.append('fileName', data.fileIrs)

      console.log(payload)

      // @ts-expect-error
      await lecturerService.validateStudentIRS(payload)
    },
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ['irsList'],
      })
      toast.dismiss()
      toast.success('Berhasil validasi IRS')
      setIsSubmitting(false)
    },
    onMutate: () => {
      toast.loading('Sedang validasi IRS')
    },
    onError: () => {
      toast.dismiss()
      toast.error('Gagal validasi IRS')
    },
    onSettled: () => {
      setIsSubmitting(false)
    },
  })

  const removeUser = useMutation({
    mutationKey: ['removeDpt'],
    mutationFn: async (id: string) => {
      setIsSubmitting(true)

      // await usersService.removeUser(id)
    },
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ['dpt'],
      })
      toast.dismiss()
      toast.success('Berhasil menghapus akun')
      setIsSubmitting(false)
    },
    onMutate: () => {
      toast.loading('Sedang menghapus akun')
    },
    onError: () => {
      toast.dismiss()
      toast.error('Gagal menghapus akun')
    },
    onSettled: () => {
      setIsSubmitting(false)
    },
  })

  return (
    <>
      <ConfirmationAlert
        loading={isSubmitting}
        open={open}
        setOpen={setOpen}
        action={() => removeUser.mutate(nim as string)}
      />

      <DialogDetailIRS data={row.original as GetListIRSValidationResponseListDto} state={state} setState={setState} />

      <div className='flex gap-3 justify-end'>
        <Button variant='outline' size='sm' onClick={() => setState(!state)}>
          Detail
        </Button>
        <Button variant='outline' size='sm' onClick={() => validateIrs.mutate()}>
          Setujui
        </Button>
      </div>
    </>
  )
}
