import axios from "axios";

function getAuthHeaders() {
  const token = localStorage.getItem("access_token");
  if (!token) {
    throw new Error("Authentication token is missing.");
  }
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

export async function deleteAccessRule(id: number): Promise<void> {
  await axios.delete(
    `${process.env.VUE_APP_API_URL}/access-rules/${id}`,
    getAuthHeaders()
  );
}
