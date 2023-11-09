'use client'

import Image from 'next/image'
import { useSession } from 'next-auth/react'

import Header from '@/components/header'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

export default function Profile() {
  const { data: session } = useSession()

  return (
    <main>
      <Header>
        <span className='font-bold text-xl'>Profil</span>
      </Header>

      <div className='flex flex-col md:flex-row gap-2'>
        <div className='grid grid-cols-2 md:flex md:flex-col flex-row gap-2'>
          <div className='bg-content h-max flex flex-col items-center rounded-md p-10 gap-4 w-full md:w-max'>
            <Image
              className='rounded-2xl aspect-square'
              src={session?.user.image!}
              width={150}
              height={150}
              alt={session?.user.name!}
            />
          </div>
          <div className='bg-content h-max flex flex-col items-center rounded-md p-4 gap-2 w-full'>
            <Button size='sm' variant='outline' className='w-full'>
              Ubah Foto
            </Button>
            <Button size='sm' variant='outline' className='w-full'>
              Ubah Profil
            </Button>
            <Button size='sm' variant='outline' className='w-full'>
              Ubah Kata Sandi
            </Button>
          </div>
        </div>
        <div className='bg-content h-full flex flex-1 rounded-md p-10 w-full'>
          <div className='flex flex-col justify-center gap-3 w-full'>
            <div className='flex flex-col gap-1'>
              <span className='font-bold text-xl'>{session?.user.name}</span>
              <span className='text-gray-500'>{session?.user.email}</span>
            </div>

            <div className='flex flex-wrap gap-4'>
              <div className='flex flex-col gap-3 p-4 border rounded-xl w-full md:w-[calc(50%-8px)] h-max '>
                <span className='font-medium text-xs uppercase tracking-wider text-primary/50'>Akademik</span>
                <div className='flex flex-col gap-0.5'>
                  <Label className='font-medium'>Status</Label>
                  <span className='text-muted-foreground text-sm'>Aktif</span>
                </div>
                <div className='flex flex-col gap-0.5'>
                  <Label className='font-medium'>NIM</Label>
                  <span className='text-muted-foreground text-sm'>24060121140040</span>
                </div>
                <div className='flex flex-col gap-0.5'>
                  <Label className='font-medium'>Angkatan</Label>
                  <span className='text-muted-foreground text-sm'>2021</span>
                </div>
                <div className='flex flex-col gap-0.5'>
                  <Label className='font-medium'>Dosen Wali</Label>
                  <span className='text-muted-foreground text-sm'>Dr. Eng. Adi Wibowo, S.Si., M.Kom.</span>
                </div>
              </div>
              <div className='flex flex-col gap-3 p-4 border rounded-xl w-[calc(50%-8px)] h-max '>
                <span className='font-medium text-xs uppercase tracking-wider text-primary/50'>Alamat</span>

                <div className='flex flex-col gap-0.5'>
                  <Label className='font-medium'>Alamat</Label>
                  <span className='text-muted-foreground text-sm'>Bukit Diponegoro</span>
                </div>
                <div className='flex flex-col gap-0.5'>
                  <Label className='font-medium'>Provinsi</Label>
                  <span className='text-muted-foreground text-sm'>Jawa Tengah</span>
                </div>
                <div className='flex flex-col gap-0.5'>
                  <Label className='font-medium'>Kota</Label>
                  <span className='text-muted-foreground text-sm'>Semarang</span>
                </div>
              </div>
              <div className='flex flex-col gap-3 p-4 border rounded-xl w-[calc(50%-8px)] h-max '>
                <span className='font-medium text-xs uppercase tracking-wider text-primary/50'>Pribadi</span>

                <div className='flex flex-col gap-0.5'>
                  <Label className='font-medium'>Email</Label>
                  <span className='text-muted-foreground text-sm'>bhaska@email.com</span>
                </div>
                <div className='flex flex-col gap-0.5'>
                  <Label className='font-medium'>Nomor Telepon</Label>
                  <span className='text-muted-foreground text-sm'>085156282653</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
