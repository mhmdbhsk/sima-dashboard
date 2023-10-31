import { IconFileInvoice, IconHome, IconSettings, IconTriangleSquareCircle, IconUsersGroup } from '@tabler/icons-react'

const navigationLists = [
  { name: 'Home', href: '/dashboard', icon: IconHome },
  { name: 'Products', href: '/dashboard/products', icon: IconTriangleSquareCircle },
  {
    name: 'Invoices',
    href: '/dashboard/invoices',
    icon: IconFileInvoice,
  },
  { name: 'Customers', href: '/dashboard/customers', icon: IconUsersGroup },
  { name: 'Settings', href: '/dashboard/settings', icon: IconSettings },
]

export default navigationLists
