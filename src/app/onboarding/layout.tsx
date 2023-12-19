import type { Metadata } from 'next'

import OnboardingLayout from '@/components/layouts/onboarding-layout'

export const metadata: Metadata = {
  title: 'Orientasi - Sistem Informasi Mahasiswa',
  description: 'Sistem Informasi Mahasiswa',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <OnboardingLayout>{children}</OnboardingLayout>
}
