import { zodResolver } from '@hookform/resolvers/zod'
import { IconArrowLeft } from '@tabler/icons-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { DialogDescription } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const generalFormSchema = z.object({
  nip: z
    .string()
    .max(14, {
      message: 'NIP tidak bisa lebih dari 14 karakter.',
    })
    .min(10, { message: 'NIM tidak bisa kurang dari 10 karakter' }),
  name: z.string().min(2, {
    message: 'Nama setidaknya terdiri dari 2 karakter.',
  }),
})

export const DialogCreateGeneralForm = ({
  stateSetter,
}: {
  stateSetter: (value: 'option' | 'form' | 'upload' | 'student' | 'lecturer' | 'department' | 'admin') => void
}) => {
  const form = useForm<z.infer<typeof generalFormSchema>>({
    resolver: zodResolver(generalFormSchema),
  })

  function onSubmit(values: z.infer<typeof generalFormSchema>) {
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
            name='nip'
            render={({ field }) => (
              <FormItem>
                <FormLabel>NIP</FormLabel>
                <FormControl>
                  <Input placeholder='Masukkan NIP' {...field} />
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
                  <Input placeholder='Masukkan nama' {...field} />
                </FormControl>
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
