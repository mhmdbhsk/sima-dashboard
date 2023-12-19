'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { DialogDescription } from '@radix-ui/react-dialog'
import { IconFilePlus } from '@tabler/icons-react'
import { useMutation, useQueries, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { IRS_MAX_FILE_SIZE } from '@/config/file-size-config'
import { activeStatus } from '@/lib/enum/status'
import { profileService } from '@/services/profile-service'
import { studentsService } from '@/services/students-service'

const irsFormSchema = z.object({
  status: z.enum([activeStatus.Aktif, activeStatus.Cuti]),
  semester: z.string().min(1, { message: 'Semester harus diisi' }),
  sks: z.string().min(1, {
    message: 'Jumlah SKS harus diisi',
  }),
  file: z
    .custom<File>((v) => v instanceof File, {
      message: 'File harus diisi',
    })
    .refine((file) => file?.size <= IRS_MAX_FILE_SIZE, { message: `Ukuran file maksimal 5MB.` }),
})

export default function DialogCreateIRS() {
  const [listIrs, student] = useQueries({
    queries: [
      {
        queryKey: ['listIrs'],
        queryFn: studentsService.getListIrs,
      },
      {
        queryKey: ['studentProfile'],
        queryFn: profileService.getProfileStudent,
      },
    ],
  })

  const irsData = listIrs?.data?.data.data
  const studentData = student?.data?.data.data
  const progressIrsCount = irsData?.length

  const { data: sessionData } = useSession()
  const queryClient = useQueryClient()
  const [loading, setLoading] = useState<boolean>(false)
  const [state, setState] = useState<boolean>(false)
  const form = useForm<z.infer<typeof irsFormSchema>>({
    resolver: zodResolver(irsFormSchema),
    mode: 'all',
    defaultValues: {
      status: undefined,
      semester: '',
      sks: '',
      file: undefined,
    },
  })
  const {
    formState: { isValid },
  } = form

  const createIrsReport = useMutation({
    mutationKey: ['createAdmin'],
    mutationFn: async (values: z.infer<typeof irsFormSchema>) => {
      setLoading(true)

      const formData = new FormData()

      formData.append('nim', sessionData?.user.id!)
      formData.append('status', values.status)
      formData.append('semester', values.semester)
      formData.append('jumlahSks', values.sks)
      formData.append('dokumen', values.file)

      // @ts-expect-error
      await studentsService.createEntryIRS(formData)
    },
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ['listIrs'],
      })
      queryClient.refetchQueries({
        queryKey: ['studentProfile'],
      })
      toast.dismiss()
      toast.success('Berhasil membuat laporan progress IRS')
      setLoading(false)
      setState(false)
      form.reset()
    },
    onError: () => {
      toast.dismiss()
      toast.error('Gagal membuat laporan progress IRS')
    },
    onSettled: () => {
      setLoading(false)
    },
  })

  function onSubmit(values: z.infer<typeof irsFormSchema>) {
    createIrsReport.mutate(values)
  }

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
        <DialogDescription>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
              <FormField
                control={form.control}
                name='status'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status Aktif Mahasiswa</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Pilih status aktif mahasiswa' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={activeStatus.Aktif}>Aktif</SelectItem>
                        <SelectItem value={activeStatus.Cuti}>Cuti</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='semester'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Semester</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Pilih semester' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((item) =>
                          item > progressIrsCount! ? (
                            <SelectItem value={item.toString()} key={item} disabled={item > studentData?.semester!}>
                              {item > studentData?.semester! ? `Belum mencapai semester ${item}` : `Semester ${item}`}
                            </SelectItem>
                          ) : (
                            <SelectItem value={item.toString()} key={item} disabled>
                              Sudah mengisi semester {item}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='sks'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SKS</FormLabel>
                    <FormControl>
                      <Input placeholder='Masukkan total SKS' type='number' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='file'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bukti IRS</FormLabel>
                    <FormControl>
                      <Input
                        accept='.pdf'
                        type='file'
                        onChange={(e) => field.onChange(e.target.files ? e.target.files[0] : null)}
                      />
                    </FormControl>
                    <FormDescription>Masukkan file pdf dengan ukuran maksimal 5 MB</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type='submit' disabled={!isValid} loading={loading}>
                Buat Laporan
              </Button>
            </form>
          </Form>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}
