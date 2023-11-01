import { Suspense } from 'react'

export default async function Users() {
  return (
    <main>
      <h1 className='mb-4 text-xl md:text-2xl'>Users</h1>
      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4' />
    </main>
  )
}
