'use client'

import { useSession } from 'next-auth/react'

import AdminOverview from './admin'
import StudentOverview from './student'

export default function Overview() {
  const { data: session } = useSession()

  if (session) {
    switch (session.user.role) {
      case 'admin':
        return <AdminOverview />
      case 'department':
        return <StudentOverview />
      case 'student':
        return <StudentOverview />
      default:
        return <StudentOverview />
    }
  }
}
