import api from './api'

export async function createWorkshopRegistration(registrationData) {
  const response = await api.post('/registrations', registrationData)
  return response.data
}