import api from './api'

function getDataOrEmptyArray(response) {
  return response.status === 204 ? [] : response.data
}

// USERS
export async function getAllUsers() {
  const response = await api.get('/users', {
    validateStatus: (status) => status === 200 || status === 204,
  })

  return getDataOrEmptyArray(response)
}

export async function getUserById(id) {
  const response = await api.get(`/users/${id}`)
  return response.data
}

export async function createUser(userData) {
  const response = await api.post('/users', userData)
  return response.data
}

export async function updateUser(id, userData) {
  const response = await api.put(`/users/${id}`, userData)
  return response.data
}

export async function deleteUser(id) {
  await api.delete(`/users/${id}`)
}

// SPEAKERS
export async function getAllSpeakers() {
  const response = await api.get('/speakers', {
    validateStatus: (status) => status === 200 || status === 204,
  })

  return getDataOrEmptyArray(response)
}

export async function getSpeakerById(id) {
  const response = await api.get(`/speakers/${id}`)
  return response.data
}

export async function createSpeaker(speakerData) {
  const response = await api.post('/speakers', speakerData)
  return response.data
}

export async function updateSpeaker(id, speakerData) {
  const response = await api.put(`/speakers/${id}`, speakerData)
  return response.data
}

export async function deleteSpeaker(id) {
  await api.delete(`/speakers/${id}`)
}

// EVENTS
export async function getAllEvents() {
  const response = await api.get('/events', {
    validateStatus: (status) => status === 200 || status === 204,
  })

  return getDataOrEmptyArray(response)
}

export async function getEventById(id) {
  const response = await api.get(`/events/${id}`)
  return response.data
}

export async function createEvent(eventData) {
  const response = await api.post('/events', eventData)
  return response.data
}

export async function updateEvent(id, eventData) {
  const response = await api.put(`/events/${id}`, eventData)
  return response.data
}

export async function deleteEvent(id) {
  await api.delete(`/events/${id}`)
}

// WORKSHOPS
export async function getAllWorkshops() {
  const response = await api.get('/workshops', {
    validateStatus: (status) => status === 200 || status === 204,
  })

  return getDataOrEmptyArray(response)
}

export async function getWorkshopById(id) {
  const response = await api.get(`/workshops/${id}`)
  return response.data
}

export async function createWorkshop(workshopData) {
  const response = await api.post('/workshops', workshopData)
  return response.data
}

export async function updateWorkshop(id, workshopData) {
  const response = await api.put(`/workshops/${id}`, workshopData)
  return response.data
}

export async function deleteWorkshop(id) {
  await api.delete(`/workshops/${id}`)
}

// REGISTRATIONS
export async function getAllRegistrations() {
  const response = await api.get('/registrations', {
    validateStatus: (status) => status === 200 || status === 204,
  })

  return getDataOrEmptyArray(response)
}

export async function getRegistrationById(id) {
  const response = await api.get(`/registrations/${id}`)
  return response.data
}

export async function createRegistration(registrationData) {
  const response = await api.post('/registrations', registrationData)
  return response.data
}

export async function updateRegistration(id, registrationData) {
  const response = await api.put(`/registrations/${id}`, registrationData)
  return response.data
}

export async function deleteRegistration(id) {
  await api.delete(`/registrations/${id}`)
}