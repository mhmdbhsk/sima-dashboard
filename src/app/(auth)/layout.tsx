import type { Metadata } from 'next'

import AuthLayout from '@/components/layouts/auth-layout'

export const metadata: Metadata = {
  title: 'Masuk - Sistem Informasi Mahasiswa',
  description: 'Sistem Informasi Mahasiswa',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <AuthLayout>{children}</AuthLayout>
}
