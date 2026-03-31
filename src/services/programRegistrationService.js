import api from './api'

export async function createProgramRegistration(programRegistrationData) {
  const response = await api.post('/program-registrations', programRegistrationData)
  return response.data
}