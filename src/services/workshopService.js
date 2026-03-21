import api from './api'

export async function getAllWorkshops() {
  const response = await api.get('/workshops', {
    validateStatus: (status) => status === 200 || status === 204,
  })

  if (response.status === 204) {
    return []
  }

  return response.data
}