import { createRouter } from '@tanstack/react-router'
import { rootRoute } from './routes/__root'
import { incidentsRoute } from './routes/incidents'
import { indexRoute } from './routes/index'
import { serviceDetailRoute } from './routes/service-detail'
import { servicesRoute } from './routes/services'

const routeTree = rootRoute.addChildren([
  indexRoute,
  servicesRoute,
  serviceDetailRoute,
  incidentsRoute,
])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
