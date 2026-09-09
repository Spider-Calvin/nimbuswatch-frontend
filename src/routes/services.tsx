import { useQuery } from '@tanstack/react-query'
import { createRoute } from '@tanstack/react-router'
import { fetchServices } from '../lib/api'
import { rootRoute } from './__root'

function ServicesPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['services'],
    queryFn: fetchServices,
  })

  if (isLoading) return <p>Loading services...</p>
  if (error) return <p>Failed to load services: {error.message}</p>

  return (
    <section>
      <h1>Services</h1>
      <ul>
        {data!.map((service) => (
          <li key={service.id}>
            {service.name} — {service.url} ({service.status})
          </li>
        ))}
      </ul>
    </section>
  )
}

export const servicesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/services',
  component: ServicesPage,
})
