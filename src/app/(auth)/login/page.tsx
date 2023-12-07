'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { IconEye, IconEyeClosed } from '@tabler/icons-react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next-nprogress-bar'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { ThemeToggle } from '@/components/theme-toggle'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const loginSchema = z.object({
  username: z.string().min(1, {
    message: 'Username minimal terdiri dari 1 karakter.',
  }),
  password: z.string().min(2, {
    message: 'Password minimal terdiri dari 2 karakter.',
  }),
})

const Login = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') ?? '/dashboard'

  const form = useForm({ resolver: zodResolver(loginSchema) })
  const {
    formState: { isValid },
  } = form

  async function onSubmit(values: any) {
    try {
      setLoading(true)

      const res = await signIn('credentials', {
        username: values.username,
        password: values.password,
        callbackUrl,
        redirect: false,
      })

      if (!res?.error) {
        router.push(callbackUrl)
      } else {
        setError(res?.error)
        form.setError('username', { message: res?.error })
        form.setError('password', { message: res?.error })
      }
    } catch (error: any) {
      if (error) setError(error?.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex justify-center items-center flex-col min-h-screen'>
      <Image src='/images/logo-filled-primary.svg' width={100} height={100} alt='Logo' />
      <div className='my-4' />
      <Card className='w-full max-w-xs shadow-none'>
        <CardHeader className='pb-3'>
          <CardTitle>Silahkan masuk untuk melanjutkan</CardTitle>
          <CardDescription>Masukkan kredensial yang benar</CardDescription>
        </CardHeader>
        <CardContent className='space-y-3'>
          {error && (
            <div>
              <Alert variant='destructive'>
                <AlertTitle>Login Gagal!</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </div>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              <FormField
                control={form.control}
                name='username'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor='username'>Username</FormLabel>
                    <FormControl>
                      <Input id='username' type='text' placeholder='Masukkan username' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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

              <Button type='submit' className='w-full' disabled={!isValid} loading={loading}>
                Masuk
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className='mt-4' />

      <span className='rounded-md border bg-background px-2 py-1 text-xs text-gray-300 shadow-sm'>versi 0.1</span>

      <div className='absolute bottom-0 left-0 right-0 p-6 text-center flex flex-col items-center gap-4'>
        <ThemeToggle />
        <span className='text-sm text-gray-400'>© 2023 PPL.</span>
      </div>
    </div>
  )
}

export default Login
