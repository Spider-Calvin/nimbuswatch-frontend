import { createRoute } from '@tanstack/react-router'
import { rootRoute } from './__root'

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => (
    <section id="center">
      <h1>NimbusWatch</h1>
      <p>Service monitoring dashboard.</p>
    </section>
  ),
})
