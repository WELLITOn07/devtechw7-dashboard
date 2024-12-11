import axios from "axios";
import { User } from "@/models/user.model";

const BASE_URL = `${process.env.VUE_APP_API_URL}/user`;

export async function saveUsers(users: User[]): Promise<void> {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("Authentication token is missing.");

  await axios.post(BASE_URL, users, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function updateUser(
  user: Partial<User> & { id: number }
): Promise<void> {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("Authentication token is missing.");

  await axios.put(`${BASE_URL}/${user.id}`, user, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function deleteUser(id: number): Promise<void> {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("Authentication token is missing.");

  await axios.delete(`${BASE_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
