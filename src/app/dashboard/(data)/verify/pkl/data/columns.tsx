'use client'

import { ColumnDef } from '@tanstack/react-table'

import { VerifyIrsRowActions } from './row-actions'

import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'
import { DataTableRowActions } from '@/components/data-table/data-table-row-actions'
import { Checkbox } from '@/components/ui/checkbox'
import { GetListIRSValidationResponseListDto } from '@/lib/dto/lecturer'

export const columns: ColumnDef<GetListIRSValidationResponseListDto>[] = [
  // {
  //   id: 'select',
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={table.getIsAllPageRowsSelected()}
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label='Select all'
  //       className='translate-y-[2px]'
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label='Select row'
  //       className='translate-y-[2px]'
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: 'nama',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Nama' />,
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-[500px] truncate font-medium'>{row.getValue('nama')}</span>
        </div>
      )
    },
    enableSorting: true,
    enableHiding: false,
    enableResizing: true,
  },
  {
    accessorKey: 'nim',
    header: ({ column }) => <DataTableColumnHeader column={column} title='NIM' />,
    cell: ({ row }) => <div>{row.getValue('nim')}</div>,
    enableHiding: false,
  },
  {
    accessorKey: 'semester',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Semester' />,
    cell: ({ row }) => <div>{row.getValue('semester')}</div>,
  },

  {
    id: 'actions',
    cell: ({ row }) => <VerifyIrsRowActions row={row} />,
  },
]
