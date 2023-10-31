'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import { useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next-nprogress-bar'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const loginSchema = yup
  .object()
  .shape({
    email: yup.string().required(),
    password: yup.string().required(),
  })
  .required()

const Login = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') ?? '/dashboard'

  const form = useForm({ resolver: yupResolver(loginSchema) })
  const {
    formState: { isValid },
  } = form

  async function onSubmit(values: any) {
    try {
      setLoading(true)

      const res = await signIn('credentials', {
        redirect: false,
        email: values.email,
        password: values.password,
        callbackUrl,
      })

      if (!res?.error) {
        router.push(callbackUrl)
      } else {
        setError(res?.error)
        form.setError('email', { message: res?.error })
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
                name='password'
                render={({ field }) => (
                  <FormItem className='transition-all duration-500 ease-in-out'>
                    <FormLabel htmlFor='password'>Password</FormLabel>
                    <FormControl>
                      <Input id='password' type='password' placeholder='Masukkan password' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type='submit' className='w-full' disabled={!isValid}>
                Masuk
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <span className='rounded-md border bg-white px-2 py-1 text-xs text-gray-300 shadow-sm'>versi 0.1</span>

      <div className='absolute bottom-0 left-0 right-0 p-6 text-center'>
        <span className='text-sm text-gray-500'>© 2023 ikhtiar.</span>
      </div>
    </div>
  )
}

export default Login
