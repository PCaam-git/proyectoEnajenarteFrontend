import api from './api'

export async function sendContactMessage(data) {
  const response = await api.post('/contact-messages', data)
  return response.data
}