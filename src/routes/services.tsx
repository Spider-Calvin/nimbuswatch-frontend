import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createRoute } from '@tanstack/react-router'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { ServiceForm } from '../components/service-form'
import { createService, fetchServices, type Service } from '../lib/api'
import { rootRoute } from './__root'

const columnHelper = createColumnHelper<Service>()

const columns = [
  columnHelper.accessor('name', { header: 'Name' }),
  columnHelper.accessor('url', { header: 'URL' }),
  columnHelper.accessor('status', { header: 'Status' }),
]

function ServicesPage() {
  const queryClient = useQueryClient()
  const { data, isLoading, error } = useQuery({
    queryKey: ['services'],
    queryFn: fetchServices,
  })
  const createMutation = useMutation({
    mutationFn: createService,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['services'] }),
  })

  const table = useReactTable({
    data: data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  if (isLoading) return <p>Loading services...</p>
  if (error) return <p>Failed to load services: {error.message}</p>

  return (
    <section>
      <h1>Services</h1>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Add service</h2>
      <ServiceForm
        submitLabel="Add service"
        onSubmit={(value) => createMutation.mutateAsync(value)}
      />
    </section>
  )
}

export const servicesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/services',
  component: ServicesPage,
})
