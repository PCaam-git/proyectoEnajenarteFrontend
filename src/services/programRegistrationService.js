import api from "./api";

export async function createProgramRegistration(programRegistrationData) {
  const response = await api.post(
    "/program-registrations",
    programRegistrationData,
  );
  return response.data;
}

export async function getAllProgramRegistrations() {
  const response = await api.get("/program-registrations", {
    validateStatus: (status) => status === 200 || status === 204,
  });

  if (response.status === 204) {
    return [];
  }

  return response.data;
}

export async function deleteProgramRegistration(id) {
  await api.delete(`/program-registrations/${id}`);
}

export async function updateProgramRegistration(id, programRegistrationData) {
  const response = await api.put(
    `/program-registrations/${id}`,
    programRegistrationData,
  );
  return response.data;
}
