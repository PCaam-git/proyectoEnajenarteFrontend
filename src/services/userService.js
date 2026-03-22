import api from './api'

export async function registerUser(userData) {
  const response = await api.post('/users', userData, {
    validateStatus: (status) => status === 201 || status === 400,
  })

  if (response.status === 400) {
    throw response.data
  }

  return response.data
}