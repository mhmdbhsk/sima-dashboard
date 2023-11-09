import Header from '@/components/header'
import Overview from '@/components/overview'

export default async function OverviewPage() {
  return (
    <main>
      <Header>
        <span className='font-bold text-xl'>Ikhtisar</span>
      </Header>

      <Overview />
    </main>
  )
}
