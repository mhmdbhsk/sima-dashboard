'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { IconArrowLeft } from '@tabler/icons-react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { DialogDescription } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { jalurMasuk } from '@/lib/enum/status'
import { adminService } from '@/services/admin-service'

const studentFormSchema = z.object({
  nim: z
    .string()
    .max(14, {
      message: 'NIM tidak bisa lebih dari 14 karakter.',
    })
    .min(10, { message: 'NIM tidak bisa kurang dari 10 karakter' }),
  name: z.string().min(2, {
    message: 'Nama setidaknya terdiri dari 2 karakter.',
  }),
  year: z.string().min(4, {
    message: 'Tahun angkatan harus terdiri dari 4 karakter.',
  }),
  lecturer: z.string().min(1, {
    message: 'Dosen wali harus dipilih.',
  }),
})

export const DialogCreateStudentForm = ({
  stateSetter,
}: {
  stateSetter: (value: 'option' | 'upload' | 'student') => void
}) => {
  const [loading, setLoading] = useState<boolean>(false)
  const queryClient = useQueryClient()
  const { data } = useQuery({
    queryKey: ['listLecturer'],
    queryFn: adminService.getLecturerDropdownList,
  })

  const createUser = useMutation({
    mutationKey: ['createUserStudent'],
    mutationFn: async (id: string) => {
      setLoading(true)

      // await usersService.removeUser(id)
    },
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ['students'],
      })
      toast.dismiss()
      toast.success('Berhasil membuat akun')
      setLoading(false)
    },
    onMutate: () => {
      toast.loading('Sedang membuat akun')
    },
    onError: () => {
      toast.dismiss()
      toast.error('Gagal membuat akun')
    },
    onSettled: () => {
      setLoading(false)
    },
  })

  const form = useForm<z.infer<typeof studentFormSchema>>({
    resolver: zodResolver(studentFormSchema),
  })
  const {
    formState: { isValid },
  } = form

  console.log(form.formState.errors)

  function onSubmit(values: z.infer<typeof studentFormSchema>) {
    console.log(values)
  }

  return (
    <DialogDescription className='flex flex-col gap-3 pt-3'>
      <Button variant='outline' className='px-3 gap-2 w-max' size='sm' onClick={() => stateSetter('option')}>
        <IconArrowLeft size={16} /> Kembali
      </Button>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
          <FormField
            control={form.control}
            name='nim'
            render={({ field }) => (
              <FormItem>
                <FormLabel>NIM</FormLabel>
                <FormControl>
                  <Input placeholder='Masukkan NIM mahasiswa' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama</FormLabel>
                <FormControl>
                  <Input placeholder='Masukkan nama mahasiswa' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='year'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Angkatan</FormLabel>
                <FormControl>
                  <Input placeholder='Masukkan angkatan mahasiswa' type='number' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='lecturer'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dosen Wali</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Silahkan pilih dosen wali' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className='max-h-[200px]'>
                    {data?.data.map((item) => (
                      <SelectItem value={item.nip} key={item.nip}>
                        {item.nama}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='lecturer'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Jalur Masuk</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Silahkan pilih jalur masuk' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={jalurMasuk.SNMPTN}>SNMPTN</SelectItem>
                    <SelectItem value={jalurMasuk.SBMPTN}>SBMPTN</SelectItem>
                    <SelectItem value={jalurMasuk.Mandiri}>Mandiri</SelectItem>
                    <SelectItem value={jalurMasuk.Lainnya}>Lainnya</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type='submit' disabled={!isValid} loading={loading}>
            Buat Akun
          </Button>
        </form>
      </Form>
    </DialogDescription>
  )
}
