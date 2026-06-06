import api from "./api";

export async function registerUser(userData) {
  const response = await api.post("/users", userData, {
    validateStatus: (status) => status === 201 || status === 400,
  });

  if (response.status === 400) {
    throw response.data;
  }

  return response.data;
}

export async function getCurrentUser() {
  const response = await api.get("/users/me");
  return response.data;
}

export async function getUserRegistrations(userId) {
  const response = await api.get(`/users/${userId}/registrations`, {
    validateStatus: (status) => status === 200 || status === 204,
  });

  if (response.status === 204) {
    return [];
  }

  return response.data;
}

export async function getUserProgramRegistrations(userId) {
  const response = await api.get(`/users/${userId}/program-registrations`, {
    validateStatus: (status) => status === 200 || status === 204,
  });

  if (response.status === 204) {
    return [];
  }

  return response.data;
}

export async function updateUser(id, userData) {
  const response = await api.put(`/users/${id}`, userData);
  return response.data;
}

export async function getAllUsers() {
  const response = await api.get("/users", {
    validateStatus: (status) => status === 200 || status === 204,
  });

  if (response.status === 204) {
    return [];
  }

  return response.data;
}
