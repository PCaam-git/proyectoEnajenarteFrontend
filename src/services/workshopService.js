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


export async function getWorkshopById(id) {
  const response = await api.get(`/workshops/${id}`, {
    validateStatus: (status) => status === 200 || status === 404,
  })

  if (response.status === 404) {
    return null
  }

  return response.data
}