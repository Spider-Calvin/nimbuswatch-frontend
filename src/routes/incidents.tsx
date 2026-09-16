import { useQuery } from '@tanstack/react-query'
import { createRoute } from '@tanstack/react-router'
import { fetchIncidents } from '../lib/api'
import { rootRoute } from './__root'

function IncidentsPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['incidents'],
    queryFn: fetchIncidents,
  })

  if (isLoading) return <p>Loading incidents...</p>
  if (error) return <p>Failed to load incidents: {error.message}</p>

  return (
    <section>
      <h1>Incidents</h1>
      <ul>
        {data!.map((incident) => (
          <li key={incident.id}>
            {incident.title} — service #{incident.service_id} ({incident.status})
          </li>
        ))}
      </ul>
    </section>
  )
}

export const incidentsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/incidents',
  component: IncidentsPage,
})
