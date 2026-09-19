const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080'

export type Service = {
  id: number
  name: string
  url: string
  status: string
  created_at: string
  updated_at: string
}

export async function fetchServices(): Promise<Service[]> {
  const res = await fetch(`${API_URL}/services`)
  if (!res.ok) throw new Error(`failed to fetch services: ${res.status}`)
  return res.json()
}

export type ServiceInput = {
  name: string
  url: string
}

export async function createService(input: ServiceInput): Promise<Service> {
  const res = await fetch(`${API_URL}/services`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })
  if (!res.ok) throw new Error(`failed to create service: ${res.status}`)
  return res.json()
}

export async function updateService(id: number, input: Partial<ServiceInput>): Promise<Service> {
  const res = await fetch(`${API_URL}/services/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })
  if (!res.ok) throw new Error(`failed to update service: ${res.status}`)
  return res.json()
}

export type Incident = {
  id: number
  service_id: number
  title: string
  description: string | null
  status: string
  created_at: string
  updated_at: string
}

export async function fetchIncidents(): Promise<Incident[]> {
  const res = await fetch(`${API_URL}/incidents`)
  if (!res.ok) throw new Error(`failed to fetch incidents: ${res.status}`)
  return res.json()
}
