import Header from '@/components/header'
import { ThemeToggle } from '@/components/theme-toggle'

export default async function Settings() {
  return (
    <main>
      <Header>
        <span className='font-bold text-xl'>Pengaturan</span>
      </Header>

      <div className='dark:bg-primary/10 bg-gray-50 h-full p-6 rounded-md'>
        <div>
          <div className='flex justify-between flex-col'>
            <span className='text-lg font-medium'>Tampilan</span>
            <span className='text-sm opacity-50'>Pengaturan tampilan aplikasi</span>
          </div>
          <div className='mt-4 flex justify-between'>
            <div className='flex justify-between flex-col'>
              <span className='text-sm font-medium '>Mode Tema</span>
              <span className='text-xs opacity-50'>Mode tema yang digunakan pada aplikasi</span>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </main>
  )
}
