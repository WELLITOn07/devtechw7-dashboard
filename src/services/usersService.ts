import axios from "axios";

export async function deleteUser(id: number): Promise<void> {
  const token = localStorage.getItem("access_token");
  if (!token) {
    throw new Error("Authentication token is missing.");
  }

  await axios.delete(`${process.env.VUE_APP_API_URL}/user/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
