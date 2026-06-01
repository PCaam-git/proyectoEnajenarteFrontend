export function getStatusLabel(status) {
  const labels = {
    CONFIRMED: 'Confirmado',
    PENDING: 'Pendiente',
    CANCELLED: 'Cancelado',
  }

  return labels[status] || status || 'Sin estado'
}

export function getPaymentStatusLabel(paymentStatus) {
  const labels = {
    PAID: 'Pagado',
    PENDING: 'Pendiente',
  }

  return labels[paymentStatus] || paymentStatus || 'Pendiente'
}