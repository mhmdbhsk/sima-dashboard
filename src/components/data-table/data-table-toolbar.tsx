'use client'

import { Cross2Icon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'

import { DataTableFacetedFilter } from '@/components/data-table/data-table-faceted-filter'
import { DataTableViewOptions } from '@/components/data-table/data-table-view-options'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  searchBy?: string
  filters?: {
    label: string
    field: string
    options: {
      value: string
      label: string
      icon?: any
    }[]
  }[]
}

export function DataTableToolbar<TData>({ table, filters, searchBy }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 items-center space-x-2 overflow-x-auto'>
        {searchBy && (
          <Input
            placeholder={`Filter ${searchBy}...`}
            value={(table.getColumn(searchBy)?.getFilterValue() as string) ?? ''}
            onChange={(event) => table.getColumn(searchBy)?.setFilterValue(event.target.value)}
            className='h-8 w-[150px] lg:w-[250px]'
          />
        )}

        {filters?.map(
          (filter) =>
            table.getColumn(filter.field) && (
              <DataTableFacetedFilter
                column={table.getColumn(filter.field)}
                title={filter.label}
                options={filter.options}
              />
            )
        )}

        {isFiltered && (
          <Button variant='ghost' onClick={() => table.resetColumnFilters()} className='h-8 px-2 lg:px-3'>
            Reset
            <Cross2Icon className='ml-2 h-4 w-4' />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}
