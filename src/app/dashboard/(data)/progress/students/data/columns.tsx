'use client'

import { ColumnDef } from '@tanstack/react-table'

import { StudentProgressRowActions } from '../components/row-actions'

import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'
import { StudentProgressResponseListDto } from '@/lib/dto/progress'

export const columns: ColumnDef<StudentProgressResponseListDto>[] = [
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
    header: ({ column }) => <DataTableColumnHeader column={column} title='Nomor Identitas' />,
    cell: ({ row }) => <div>{row.getValue('nim')}</div>,
    enableHiding: false,
  },
  {
    accessorKey: 'angkatan',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Angkatan' />,
    cell: ({ row }) => <div>{row.getValue('angkatan')}</div>,
  },
  {
    accessorKey: 'statusAktif',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Status' />,
    cell: ({ row }) => <div>{row.getValue('statusAktif')}</div>,
  },
  {
    id: 'actions',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Aksi' />,
    cell: ({ row }) => <StudentProgressRowActions row={row} />,
  },
]
