import { zodResolver } from '@hookform/resolvers/zod'
import { IconArrowLeft } from '@tabler/icons-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { DialogDescription } from '@/components/ui/dialog'
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { CSV_MAX_FILE_SIZE } from '@/config/file-size-config'
import { studentsService } from '@/services/students-service'

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
  stateSetter: (value: 'option' | 'upload' | 'student') => void
}) => {
  const [loading, setLoading] = useState<boolean>(false)
  const form = useForm<z.infer<typeof bulkFormSchema>>({
    resolver: zodResolver(bulkFormSchema),
  })
  const queryClient = useQueryClient()
  const { isValid } = form.formState

  const createBulk = useMutation({
    mutationKey: ['createBulk'],
    mutationFn: async (values) => {
      setLoading(true)

      const formData = new FormData()

      // @ts-expect-error
      formData.append('document', values.file)

      await studentsService.createBulk(formData)
    },
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ['students'],
      })
      toast.dismiss()
      toast.success('Berhasil membuat laporan progress IRS')
      setLoading(false)
      stateSetter('option')
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

  function onSubmit(values: z.infer<typeof bulkFormSchema>) {
    // @ts-expect-error
    createBulk.mutate(values)
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
          <Button type='submit' disabled={!isValid}>
            Buat
          </Button>
        </form>
      </Form>
    </DialogDescription>
  )
}
