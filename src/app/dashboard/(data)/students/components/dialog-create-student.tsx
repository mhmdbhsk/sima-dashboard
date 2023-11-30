import { zodResolver } from '@hookform/resolvers/zod'
import { IconArrowLeft } from '@tabler/icons-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import data from '../data/users.json'

import { Button } from '@/components/ui/button'
import { DialogDescription } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

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
  stateSetter: (value: 'option' | 'form' | 'upload' | 'student' | 'lecturer' | 'department' | 'admin') => void
}) => {
  const form = useForm<z.infer<typeof studentFormSchema>>({
    resolver: zodResolver(studentFormSchema),
  })

  function onSubmit(values: z.infer<typeof studentFormSchema>) {
    console.log(values)
  }

  return (
    <DialogDescription className='flex flex-col gap-3 pt-3'>
      <Button variant='outline' className='px-3 gap-2 w-max' size='sm' onClick={() => stateSetter('form')}>
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
                      <SelectValue placeholder='Silahkan pilih status' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {data
                      .filter((datum) => datum.role === 'lecturer')
                      .map((datum) => (
                        <SelectItem value={datum.id_number}>{datum.name}</SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type='submit'>Buat Akun</Button>
        </form>
      </Form>
    </DialogDescription>
  )
}
