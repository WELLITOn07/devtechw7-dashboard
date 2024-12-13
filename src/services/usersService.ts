import axios from "axios";
import { User } from "@/models/user.model";

const BASE_URL = `${process.env.VUE_APP_API_URL}/user`;

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

export async function saveUsers(users: User[]): Promise<void> {
  await axios.post(BASE_URL, users, getAuthHeaders());
}

export async function updateUser(
  user: Partial<User> & { id: number }
): Promise<void> {
  await axios.put(`${BASE_URL}/${user.id}`, user, getAuthHeaders());
}

export async function deleteUser(id: number): Promise<void> {
  await axios.delete(`${BASE_URL}/${id}`, getAuthHeaders());
}
