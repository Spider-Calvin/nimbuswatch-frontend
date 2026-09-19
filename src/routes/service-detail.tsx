import { useQuery } from '@tanstack/react-query'
import { createRoute, Link } from '@tanstack/react-router'
import { fetchIncidents, fetchService } from '../lib/api'
import { rootRoute } from './__root'

function ServiceDetailPage() {
  const { id } = serviceDetailRoute.useParams()
  const serviceQuery = useQuery({
    queryKey: ['services', id],
    queryFn: () => fetchService(id),
  })
  const incidentsQuery = useQuery({
    queryKey: ['incidents'],
    queryFn: fetchIncidents,
  })

  if (serviceQuery.isLoading) return <p>Loading service...</p>
  if (serviceQuery.error) return <p>Failed to load service: {serviceQuery.error.message}</p>

  const service = serviceQuery.data!
  const incidents = (incidentsQuery.data ?? [])
    .filter((incident) => incident.service_id === service.id)
    .sort((a, b) => b.created_at.localeCompare(a.created_at))

  return (
    <section>
      <p>
        <Link to="/services">&larr; back to services</Link>
      </p>
      <h1>{service.name}</h1>
      <p>{service.url}</p>
      <p>Status: {service.status}</p>

      <h2>Incident timeline</h2>
      {incidentsQuery.isLoading && <p>Loading incidents...</p>}
      {incidents.length === 0 && !incidentsQuery.isLoading && <p>No incidents for this service.</p>}
      <ol>
        {incidents.map((incident) => (
          <li key={incident.id}>
            <strong>{incident.created_at}</strong> — {incident.title} ({incident.status})
            {incident.description && <p>{incident.description}</p>}
          </li>
        ))}
      </ol>
    </section>
  )
}

export const serviceDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/services/$id',
  component: ServiceDetailPage,
})
