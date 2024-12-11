import axios from "axios";

export async function deleteAccessRule(id: number): Promise<void> {
  const token = localStorage.getItem("access_token");
  if (!token) {
    throw new Error("Authentication token is missing.");
  }

  await axios.delete(`${process.env.VUE_APP_API_URL}/access-rules/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
