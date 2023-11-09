export default function Header({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex items-center rounded-md px-6 h-20 bg-primary/20 justify-between fixed left-3 top-[152px] md:top-2 md:left-64 md:right-2 right-3 backdrop-blur-md z-10'>
      {children}
    </div>
  )
}
