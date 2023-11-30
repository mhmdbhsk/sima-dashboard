'use client'

import { ColumnDef } from '@tanstack/react-table'

import { roles } from './filters'
import { Users } from './schema'

import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'
import { DataTableRowActions } from '@/components/data-table/data-table-row-actions'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'

export const columns: ColumnDef<Users>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='translate-y-[2px]'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='translate-y-[2px]'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  // {
  //   accessorKey: 'id',
  //   header: ({ column }) => <DataTableColumnHeader column={column} title='Task' />,
  //   cell: ({ row }) => <div className='w-[80px]'>{row.getValue('id')}</div>,
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Nama' />,
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-[500px] truncate font-medium'>{row.getValue('name')}</span>
        </div>
      )
    },
    enableSorting: true,
    enableHiding: false,
    enableResizing: true,
  },
  {
    accessorKey: 'role',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Role' />,
    cell: ({ row }) => {
      const role = roles.find((role: any) => role.value === row.original.role)

      return (
        <div>
          {' '}
          {role && (
            <div className='flex gap-1 items-center'>
              {role.icon && <role.icon className='mr-2 h-4 w-4 text-muted-foreground' />}
              <Badge variant='outline'>{role.label}</Badge>
            </div>
          )}
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'id_number',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Nomor Identitas' />,
    cell: ({ row }) => <div>{row.getValue('id_number')}</div>,
    enableHiding: false,
  },
  {
    accessorKey: 'email',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Email' />,
    cell: ({ row }) => <div>{row.getValue('email')}</div>,
    // cell: ({ row }) => {
    //   const label = labels.find((label: any) => label.value === row.original.label)

    //   return (
    //     <div className='flex space-x-2'>
    //       {label && <Badge variant='outline'>{label.label}</Badge>}
    //       <span className='max-w-[500px] truncate font-medium'>{row.getValue('title')}</span>
    //     </div>
    //   )
    // },
  },
  // {
  //   accessorKey: 'status',
  //   header: ({ column }) => <DataTableColumnHeader column={column} title='Status' />,
  //   cell: ({ row }) => {
  //     const status = statuses.find((status: any) => status.value === row.getValue('status'))

  //     if (!status) {
  //       return null
  //     }

  //     return (
  //       <div className='flex w-[100px] items-center'>
  //         {status.icon && <status.icon className='mr-2 h-4 w-4 text-muted-foreground' />}
  //         <span>{status.label}</span>
  //       </div>
  //     )
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id))
  //   },
  // },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]