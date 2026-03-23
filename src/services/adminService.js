import api from './api'

export async function getAllUsers() {
  const response = await api.get('/users')
  return response.data
}

export async function getAllEvents() {
  const response = await api.get('/events')
  return response.data || []
}

export async function getAllWorkshops() {
  const response = await api.get('/workshops')
  return response.data || []
}

export async function getAllRegistrations() {
  const response = await api.get('/registrations')
  return response.data || []
}

export async function updateRegistration(registration) {
  const payload = {
    numberOfTickets: registration.numberOfTickets,
    userId: registration.userId,
    workshopId: registration.workshopId,
    paymentStatus: registration.paymentStatus,
  }

  const response = await api.put(`/registrations/${registration.id}`, payload)
  return response.data
}