import SideNav from '@/components/layouts/sidenav'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex h-screen flex-col md:flex-row'>
      <div className='w-full flex-none md:w-64 fixed md:top-0 md:left-0 md:bottom-0 z-10'>
        <SideNav />
      </div>
      <div className='w-full p-3 md:p-2 md:pl-64 md:pt-[96px] pt-[240px] z-0'>{children}</div>
    </div>
  )
}
