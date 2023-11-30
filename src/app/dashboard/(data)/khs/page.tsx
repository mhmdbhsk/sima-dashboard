'use client'

import { useSession } from 'next-auth/react'

import IrsDepartment from './khs-department'
import IrsStudent from './khs-student'

export default function IRSPage() {
  const { data } = useSession()

  const role = data?.user.role

  switch (role) {
    case 'student':
      return <IrsStudent />
    default:
      return <IrsDepartment />
  }
}
