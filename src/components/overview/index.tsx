'use client'

import { useSession } from 'next-auth/react'

import AdminOverview from './admin'
import DepartmentOverview from './department'
import LecturerOverview from './lecturer'
import StudentOverview from './student'

export default function Overview() {
  const { data: session } = useSession()

  if (session) {
    switch (session.user.role) {
      case 'admin':
        return <AdminOverview />
      case 'department':
        return <DepartmentOverview />
      case 'student':
        return <StudentOverview />
      default:
        return <LecturerOverview />
    }
  }
}
