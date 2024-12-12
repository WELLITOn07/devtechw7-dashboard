import { Application } from "@/models/application.model";
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

export async function fetchApplications(): Promise<Application[]> {
  try {
    const response = await fetch(
      `${process.env.VUE_APP_API_URL}/applications`,
      getAuthHeaders()
    );
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching applications:", error);
    throw new Error("Unable to fetch applications.");
  }
}

export async function deleteApplication(id: number): Promise<void> {
  await axios.delete(
    `${process.env.VUE_APP_API_URL}/applications/${id}`,
    getAuthHeaders()
  );
}

export async function createApplication(
  application: Application
): Promise<void> {
  await axios.post(
    `${process.env.VUE_APP_API_URL}/applications`,
    application,
    getAuthHeaders()
  );
}
