import api from './api'

export async function getAllSpeakers() {
  const response = await api.get('/speakers', {
    validateStatus: (status) => status === 200 || status === 204,
  })

  if (response.status === 204) {
    return []
  }

  return response.data
}