'use client'

import Header from '@/components/header'
import Overview from '@/components/overview'

export default function OverviewPage() {
  return (
    <main>
      <Header>
        <span className='font-bold text-xl'>Ikhtisar</span>
      </Header>

      <Overview />
    </main>
  )
}
