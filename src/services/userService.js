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

export async function getUserByUsername(username) {
  const response = await api.get('/users', {
    params: { username },
    validateStatus: (status) => status === 200 || status === 204,
  })

  if (response.status === 204) {
    return null
  }

  const users = response.data
  return users.find((user) => user.username === username) || null
}

export async function getUserRegistrations(userId) {
  const response = await api.get(`/users/${userId}/registrations`, {
    validateStatus: (status) => status === 200 || status === 204,
  })

  if (response.status === 204) {
    return []
  }

  return response.data
}

export async function updateUser(id, userData) {
  const response = await api.put(`/users/${id}`, userData)
  return response.data
}