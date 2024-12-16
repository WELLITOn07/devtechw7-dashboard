import { User } from "@/models/user.model";

export function setAuthToken(token: string) {
  sessionStorage.setItem("access_token", token);
}

export function setUser(user: User) {
  sessionStorage.setItem("user", JSON.stringify(user));
}

export function getUser(): User | null {
  const storedUser = sessionStorage.getItem("user");
  return storedUser ? JSON.parse(storedUser) : null;
}

export function getAuthHeaders() {
  const token = sessionStorage.getItem("access_token");
  if (!token) {
    throw new Error("Authentication token is missing.");
  }
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}
