import { zodResolver } from '@hookform/resolvers/zod'
import { IconArrowLeft } from '@tabler/icons-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { DialogDescription } from '@/components/ui/dialog'
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const bulkFormSchema = z.object({
  file: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
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
                    type='file'
                    accept='.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
                    {...field}
                  />
                </FormControl>
                <FormDescription>Masukkan file csv dengan ukuran maksimal 20 MB</FormDescription>
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
