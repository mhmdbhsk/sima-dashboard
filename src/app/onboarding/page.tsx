'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { observable } from '@legendapp/state'
import { persistObservable } from '@legendapp/state/persist'
import { ObservablePersistLocalStorage } from '@legendapp/state/persist-plugins/local-storage'
import { IconEye, IconEyeClosed, IconArrowLeft } from '@tabler/icons-react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { signOut, useSession } from 'next-auth/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'

import { ThemeToggle } from '@/components/theme-toggle'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { PHOTO_MAX_FILE_SIZE } from '@/config/file-size-config'
import { profileService } from '@/services/profile-service'

const state$ = observable({
  step: null as number | null,
  data: {
    name: '',
    email: '',
    nim: '',
    address: '',
    city: '',
    phone: '',
    status: '',
    jalurMasuk: '',
    dosenWali: '',
    year: '',
    file: '',
    password: '',
    passwordConfirmation: '',
  },
})

persistObservable(state$, {
  local: 'onboarding',
  pluginLocal: ObservablePersistLocalStorage,
})

const onboardingSchema = z.object({
  name: z.string().min(2, {
    message: 'Nama minimal terdiri dari 2 karakter.',
  }),
  email: z.string().email({
    message: 'Email tidak valid.',
  }),
  nim: z.string().min(2, {
    message: 'NIM minimal terdiri dari 2 karakter.',
  }),
  address: z.string().min(2, {
    message: 'Alamat minimal terdiri dari 2 karakter.',
  }),
  city: z.string().min(2, {
    message: 'Kota minimal terdiri dari 2 karakter.',
  }),
  phone: z.string().min(2, {
    message: 'Nomor telepon minimal terdiri dari 2 karakter.',
  }),
  status: z.string().min(2, {
    message: 'Status minimal terdiri dari 2 karakter.',
  }),
  jalurMasuk: z.string().min(2, {
    message: 'Jalur masuk minimal terdiri dari 2 karakter.',
  }),
  dosenWali: z.string().min(2, {
    message: 'Dosen wali minimal terdiri dari 2 karakter.',
  }),
  year: z.number(),
})

const changePasswordSchema = z
  .object({
    password: z.string().min(8, {
      message: 'Password minimal terdiri dari 8 karakter.',
    }),
    passwordConfirmation: z.string().min(8, {
      message: 'Konfirmasi password minimal terdiri dari 8 karakter.',
    }),
  })
  .superRefine(({ passwordConfirmation, password }, ctx) => {
    if (passwordConfirmation !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'Password dan konfirmasi password tidak sama.',
      })
    }
  })

const photoProfileSchema = z.object({
  file: z
    .custom<File>((v) => v instanceof File, {
      message: 'Foto profil harus diisi',
    })
    .refine((file) => file?.size <= PHOTO_MAX_FILE_SIZE, { message: `Ukuran file maksimal 2MB.` }),
})

type StepProps = {
  setStep: (step: number) => void
}

const Onboarding = () => {
  const [step, setStep] = useState(state$.step.get())
  const handleStep = (newStep: number) => {
    setStep(newStep)
    state$.step.set(newStep!)
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1 setStep={handleStep} />
      case 2:
        return <Step2 setStep={handleStep} />
      case 3:
        return <Step3 setStep={handleStep} />
      case 4:
        return <Step4 setStep={handleStep} />
      default:
        return null
    }
  }

  return (
    <div className='flex justify-center items-center flex-col min-h-screen py-6 pb-20 md:py-0'>
      <div className='flex justify-center items-center flex-col gap-4 max-w-5xl w-full' suppressHydrationWarning>
        {renderStep()}
      </div>

      <div className='absolute bottom-0 left-0 right-0 p-6 text-center flex flex-col items-center gap-4'>
        <ThemeToggle />
      </div>
    </div>
  )
}

const Step1 = ({ setStep }: StepProps) => {
  const { data } = useSession()

  return (
    <Card className='w-full max-w-md shadow-none space-y-2'>
      <CardHeader className='pb-3 space-y-2'>
        <CardTitle className='text-3xl'>Hai, {data?.user.nama} 👋</CardTitle>
        <CardDescription>Selamat datang di SIMA, nampaknya kamu baru pertama kali mengakses SIMA. </CardDescription>
        <CardDescription>Sebelum kamu melanjutkan, isi dulu profil kamu yuk! </CardDescription>
      </CardHeader>
      <CardContent className='space-y-3'>
        <Button onClick={() => setStep(2)} className='w-full'>
          Lets go!
        </Button>
      </CardContent>
    </Card>
  )
}

const Step2 = ({ setStep }: StepProps) => {
  const { data: studentProfile } = useQuery({
    queryKey: ['studentProfile'],
    queryFn: profileService.getProfileStudent,
    refetchInterval: false,
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { data } = useSession()

  const form = useForm({
    mode: 'onChange',
    resolver: zodResolver(onboardingSchema),
    values: {
      name: data?.user.nama ?? state$.data.name.get(),
      nim: data?.user.id ?? state$.data.nim.get(),
      dosenWali: studentProfile?.data.data.namaDosenWali ?? state$.data.dosenWali.get(),
      status: studentProfile?.data.data.status ?? state$.data.status.get(),
      jalurMasuk: studentProfile?.data.data.jalurMasuk ?? state$.data.jalurMasuk.get(),
      year: studentProfile?.data.data.angkatan ?? state$.data.year.get(),
      phone: state$.data.phone.get(),
      email: state$.data.email.get(),
      address: state$.data.address.get(),
      city: state$.data.city.get(),
    },
  })
  const {
    formState: { isValid },
  } = form

  async function onSubmit(values: any) {
    try {
      setLoading(true)
      state$.data.set((prev) => ({ ...prev, ...values }))
      setStep(3)
    } catch (error: any) {
      if (error) setError(error?.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className='w-full max-w-5xl shadow-none'>
      <CardHeader className='pb-3'>
        <CardTitle className='text-2xl'>Mulai dari data pribadi kamu 🙋</CardTitle>
        <CardDescription>Tenang, SIMA bakal mastiin data kamu aman 😁</CardDescription>
      </CardHeader>
      <CardContent className='space-y-3'>
        {error && (
          <div>
            <Alert variant='destructive'>
              <AlertTitle>Onboarding Gagal!</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='w-full flex flex-col gap-4'>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor='name'>Nama Lengkap</FormLabel>
                      <FormControl>
                        <Input id='name' type='text' placeholder='Masukkan nama lengkap' disabled readOnly {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='nim'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor='nim'>NIM</FormLabel>
                      <FormControl>
                        <Input id='nim' type='text' placeholder='Masukkan NIM kamu' disabled readOnly {...field} />
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
                      <FormLabel htmlFor='year'>Angkatan</FormLabel>
                      <FormControl>
                        <Input
                          id='year'
                          type='text'
                          placeholder='Masukkan angkatan kamu'
                          disabled
                          readOnly
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='status'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor='status'>Status</FormLabel>
                      <FormControl>
                        <Input id='status' type='text' placeholder='Pilih status kamu' disabled readOnly {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='w-full flex flex-col gap-4'>
                <FormField
                  control={form.control}
                  name='jalurMasuk'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor='jalurMasuk'>Jalur Masuk</FormLabel>
                      <FormControl>
                        <Input
                          id='jalurMasuk'
                          type='text'
                          disabled
                          placeholder='Pilih jalur masuk kamu'
                          readOnly
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='dosenWali'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor='dosenWali'>Dosen Wali</FormLabel>
                      <FormControl>
                        <Input
                          id='dosenWali'
                          type='text'
                          placeholder='Masukkan dosen wali'
                          disabled
                          readOnly
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor='email'>Email</FormLabel>
                      <FormControl>
                        <Input id='email' type='email' placeholder='Masukkan email' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='phone'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor='phone'>Nomor Telepon</FormLabel>
                      <FormControl>
                        <Input id='phone' type='text' placeholder='Masukkan nomor telepon kamu' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className='space-y-4'>
              <FormField
                control={form.control}
                name='address'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor='address'>Alamat</FormLabel>
                    <FormControl>
                      <Textarea id='address' placeholder='Masukkan alamat' className='resize-none' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='city'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor='city'>Kota / Kabupaten</FormLabel>
                    <FormControl>
                      <Input id='city' placeholder='Masukkan kota atau kabupaten' className='resize-none' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type='submit' className='w-full' disabled={!isValid} loading={loading}>
                Lanjut
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

const Step3 = ({ setStep }: StepProps) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmationPassword, setShowConfirmationPassword] = useState(false)

  const form = useForm({
    mode: 'onChange',
    resolver: zodResolver(changePasswordSchema),
    values: { password: state$.data.password.get(), passwordConfirmation: state$.data.passwordConfirmation.get() },
  })
  const {
    formState: { isValid },
  } = form

  async function onSubmit(values: any) {
    try {
      setLoading(true)

      state$.data.set((prev) => ({ ...prev, ...values }))
      setStep(4)
    } catch (error: any) {
      if (error) setError(error?.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Button variant='outline' className='px-3 gap-2 w-max' size='sm' onClick={() => setStep(2)}>
        <IconArrowLeft size={16} /> Kembali
      </Button>
      <Card className='w-full max-w-xs shadow-none'>
        <CardHeader className='pb-3'>
          <CardTitle className='text-2xl'>Ubah dulu kata sandi kamu 🙈</CardTitle>
          <CardDescription>Biar orang lain gabisa masuk sembarangan</CardDescription>
        </CardHeader>
        <CardContent className='space-y-3'>
          {error && (
            <div>
              <Alert variant='destructive'>
                <AlertTitle>Onboarding Gagal!</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </div>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem className='transition-all duration-500 ease-in-out'>
                    <FormLabel htmlFor='password'>Password</FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <Input
                          id='password'
                          type={showPassword ? 'text' : 'password'}
                          placeholder='Masukkan password'
                          {...field}
                        />
                        {showPassword ? (
                          <IconEye
                            size={20}
                            stroke={1.3}
                            className='absolute right-3 top-2 text-gray-400 cursor-pointer'
                            onClick={() => setShowPassword(!showPassword)}
                          />
                        ) : (
                          <IconEyeClosed
                            size={20}
                            stroke={1.3}
                            className='absolute right-3 top-2 text-gray-400 cursor-pointer'
                            onClick={() => setShowPassword(!showPassword)}
                          />
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='passwordConfirmation'
                render={({ field }) => (
                  <FormItem className='transition-all duration-500 ease-in-out'>
                    <FormLabel htmlFor='passwordConfirmation'>Password</FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <Input
                          id='passwordConfirmation'
                          type={showConfirmationPassword ? 'text' : 'password'}
                          placeholder='Masukkan password'
                          {...field}
                        />
                        {showConfirmationPassword ? (
                          <IconEye
                            size={20}
                            stroke={1.3}
                            className='absolute right-3 top-2 text-gray-400 cursor-pointer'
                            onClick={() => setShowConfirmationPassword(!showConfirmationPassword)}
                          />
                        ) : (
                          <IconEyeClosed
                            size={20}
                            stroke={1.3}
                            className='absolute right-3 top-2 text-gray-400 cursor-pointer'
                            onClick={() => setShowConfirmationPassword(!showConfirmationPassword)}
                          />
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type='submit' className='w-full' disabled={!isValid} loading={loading}>
                Lanjut
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  )
}

const Step4 = ({ setStep }: StepProps) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  // const queryClient = useQueryClient()

  const form = useForm({ resolver: zodResolver(photoProfileSchema), values: { file: state$.data.file.get() } })
  const {
    formState: { isValid },
  } = form

  const updateFirstTime = useMutation({
    mutationKey: ['updateFirstTime'],
    mutationFn: async (values: z.infer<typeof photoProfileSchema>) => {
      setLoading(true)
      toast.loading('Sedang mengubah data profil')

      const formData = new FormData()

      formData.append('password', state$.data.password.get())
      formData.append('email', state$.data.email.get())
      formData.append('alamat', state$.data.address.get())
      formData.append('kodeKab', state$.data.city.get())
      formData.append('noHP', state$.data.phone.get())
      formData.append('foto', values.file)
      formData.append('nim', state$.data.nim.get())

      // @ts-expect-error
      await profileService.updateDataFirstTime(formData)
    },
    onSuccess: () => {
      signOut()
      // queryClient.refetchQueries({
      //   queryKey: ['candidate'],
      // })
      toast.dismiss()
      toast.success('Berhasil mengubah data profil')
      setLoading(false)
    },
    onError: () => {
      toast.dismiss()
      toast.error(`Gagal mengubah data profil`)
    },
    onSettled: () => {
      setLoading(false)
    },
  })

  return (
    <>
      <Button variant='outline' className='px-3 gap-2 w-max' size='sm' onClick={() => setStep(3)}>
        <IconArrowLeft size={16} /> Kembali
      </Button>
      <Card className='w-full max-w-xs shadow-none'>
        <CardHeader className='pb-3'>
          <CardTitle className='text-2xl'>Hebat, tinggal pasang foto nih 📸</CardTitle>
          <CardDescription>Biar orang lain gabisa masuk sembarangan</CardDescription>
        </CardHeader>
        <CardContent className='space-y-3'>
          {error && (
            <div>
              <Alert variant='destructive'>
                <AlertTitle>Onboarding Gagal!</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </div>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit((data: any) => updateFirstTime.mutate(data))} className='space-y-4'>
              <FormField
                control={form.control}
                name='file'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Foto Profil</FormLabel>
                    <FormControl>
                      <Input
                        accept='.png, .jpg, .jpeg'
                        type='file'
                        onChange={(e) => field.onChange(e.target.files ? e.target.files[0] : null)}
                      />
                    </FormControl>
                    <FormDescription>
                      Masukkan foto berformat .png, .jpg, .jpeg dengan ukuran maksimal 2MB
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type='submit' className='w-full' disabled={!isValid} loading={loading}>
                Masuk
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  )
}

export default Onboarding
