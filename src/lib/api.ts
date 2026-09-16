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
