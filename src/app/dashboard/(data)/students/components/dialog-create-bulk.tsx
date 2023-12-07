import { zodResolver } from '@hookform/resolvers/zod'
import { IconArrowLeft } from '@tabler/icons-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { DialogDescription } from '@/components/ui/dialog'
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { CSV_MAX_FILE_SIZE } from '@/config/file-size-config'

const bulkFormSchema = z.object({
  file: z
    .custom<File>((v) => v instanceof File, {
      message: 'File harus diisi',
    })
    .refine((file) => file?.size <= CSV_MAX_FILE_SIZE, { message: `Ukuran file maksimal 5MB.` }),
})

export const DialogCreateUpload = ({
  stateSetter,
}: {
  stateSetter: (value: 'option' | 'form' | 'upload' | 'student' | 'lecturer' | 'department' | 'admin') => void
}) => {
  const form = useForm<z.infer<typeof bulkFormSchema>>({
    resolver: zodResolver(bulkFormSchema),
  })

  function onSubmit(values: z.infer<typeof bulkFormSchema>) {
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
            name='file'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    accept='.csv'
                    type='file'
                    onChange={(e) => field.onChange(e.target.files ? e.target.files[0] : null)}
                  />
                </FormControl>
                <FormDescription>Masukkan file csv dengan ukuran maksimal 5 MB</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit'>Buat</Button>
        </form>
      </Form>
    </DialogDescription>
  )
}
