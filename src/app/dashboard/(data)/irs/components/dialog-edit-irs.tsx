'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { DialogDescription } from '@radix-ui/react-dialog'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { IRS_MAX_FILE_SIZE } from '@/config/file-size-config'
import { IRSListReponseDatumDto } from '@/lib/dto/student'

type DialogEditIRSProps = {
  trigger: React.ReactNode
  data: IRSListReponseDatumDto
}

const studentFormSchema = z.object({
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

export default function DialogEditIRS({ trigger, data }: DialogEditIRSProps) {
  const [state, setState] = useState<boolean>(false)
  const form = useForm<z.infer<typeof studentFormSchema>>({
    resolver: zodResolver(studentFormSchema),
    mode: 'all',
    defaultValues: {
      semester: '',
      sks: '',
      file: new File([], ''),
    },
  })
  const {
    formState: { isValid },
  } = form

  function onSubmit(values: z.infer<typeof studentFormSchema>) {
    console.log(values)
  }

  return (
    <Dialog onOpenChange={setState} open={state}>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tambah Laporan IRS</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
              <FormField
                control={form.control}
                name='semester'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Semester</FormLabel>
                    <FormControl>
                      <Input placeholder='Masukkan semester' type='number' {...field} />
                    </FormControl>
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

              <Button type='submit' disabled={!isValid}>
                Buat Laporan
              </Button>
            </form>
          </Form>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}
