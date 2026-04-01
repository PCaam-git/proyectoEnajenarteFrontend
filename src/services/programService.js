import api from './api'

export async function getAllPrograms() {
  const response = await api.get('/programs', {
    validateStatus: (status) => status === 200 || status === 204,
  })

  if (response.status === 204) {
    return []
  }

  return response.data
}

export async function getProgramById(id) {
  const response = await api.get(`/programs/${id}`, {
    validateStatus: (status) => status === 200 || status === 404,
  })

  if (response.status === 404) {
    return null
  }

  return response.data
}