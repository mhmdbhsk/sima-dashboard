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
import { KHS_MAX_FILE_SIZE } from '@/config/file-size-config'
import { activeStatus } from '@/lib/enum/status'
import { profileService } from '@/services/profile-service'
import { studentsService } from '@/services/students-service'

const khsFormSchema = z.object({
  status: z.enum([activeStatus.Aktif, activeStatus.Cuti]),
  semester: z.string().min(1, { message: 'Semester harus diisi' }),
  skss: z.string().min(1, {
    message: 'Jumlah SKS semester harus diisi',
  }),
  sksk: z.string().min(1, {
    message: 'Jumlah SKS kumulatif harus diisi',
  }),
  ips: z.string().min(1, {
    message: 'IP semester harus diisi',
  }),
  ipk: z.string().min(1, {
    message: 'IP kumulatif harus diisi',
  }),
  file: z
    .custom<File>((v) => v instanceof File, {
      message: 'File harus diisi',
    })
    .refine((file) => file?.size <= KHS_MAX_FILE_SIZE, { message: `Ukuran file maksimal 5MB.` }),
})

export default function DialogCreateKHS() {
  const [listKhs, student] = useQueries({
    queries: [
      {
        queryKey: ['listKhs'],
        queryFn: studentsService.getListKhs,
      },
      {
        queryKey: ['studentProfile'],
        queryFn: profileService.getProfileStudent,
      },
    ],
  })

  const khsData = listKhs?.data?.data.data
  const studentData = student?.data?.data.data
  const progressKhsCount = khsData?.length

  const { data: sessionData } = useSession()
  const queryClient = useQueryClient()
  const [loading, setLoading] = useState<boolean>(false)
  const [state, setState] = useState<boolean>(false)
  const form = useForm<z.infer<typeof khsFormSchema>>({
    resolver: zodResolver(khsFormSchema),
    mode: 'all',
    defaultValues: {
      status: undefined,
      semester: '',
      skss: '',
      sksk: '',
      ipk: '',
      ips: '',
      file: undefined,
    },
  })
  const {
    formState: { isValid },
  } = form

  const createKhsReport = useMutation({
    mutationKey: ['createAdmin'],
    mutationFn: async (values: z.infer<typeof khsFormSchema>) => {
      setLoading(true)

      const formData = new FormData()

      formData.append('nim', sessionData?.user.id!)
      formData.append('status', values.status)
      formData.append('semester', values.semester)
      formData.append('ipk', values.ips)
      formData.append('ips', values.ipk)
      formData.append('jumlahSksSemester', values.skss)
      formData.append('jumlahSksKumulatif', values.sksk)
      formData.append('dokumen', values.file)

      // @ts-expect-error
      await studentsService.createEntryKHS(formData)
    },
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ['listKhs'],
      })
      queryClient.refetchQueries({
        queryKey: ['studentProfile'],
      })
      toast.dismiss()
      toast.success('Berhasil membuat laporan progress KHS')
      setLoading(false)
      setState(false)
      form.reset()
    },
    onError: () => {
      toast.dismiss()
      toast.error('Gagal membuat laporan progress KHS')
    },
    onSettled: () => {
      setLoading(false)
    },
  })

  function onSubmit(values: z.infer<typeof khsFormSchema>) {
    createKhsReport.mutate(values)
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
          <DialogTitle>Tambah Laporan KHS</DialogTitle>
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
                          item > progressKhsCount! ? (
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
                name='skss'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SKS Semester</FormLabel>
                    <FormControl>
                      <Input placeholder='Masukkan total SKS semester' type='number' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='sksk'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SKS Kumulatif</FormLabel>
                    <FormControl>
                      <Input placeholder='Masukkan total SKS kumulatif' type='number' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='ips'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>IP Semester</FormLabel>
                    <FormControl>
                      <Input placeholder='Masukkan total IP semester' type='number' max={4.0} step={0.01} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='ipk'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>IP Kumulatif</FormLabel>
                    <FormControl>
                      <Input placeholder='Masukkan total IP kumulatif' type='number' max={4.0} step={0.01} {...field} />
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
                    <FormLabel>Bukti KHS</FormLabel>
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
