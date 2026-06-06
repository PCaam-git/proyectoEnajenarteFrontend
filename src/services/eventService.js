import api from './api'

export async function getAllEvents() {
  const response = await api.get('/events', {
    validateStatus: (status) => status === 200 || status === 204,
  })

  if (response.status === 204) {
    return []
  }

  return response.data
}