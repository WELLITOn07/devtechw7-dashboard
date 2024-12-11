import { Application } from "@/models/application.model";
import axios from "axios";

export async function fetchApplications(): Promise<Application[]> {
  try {
    const response = await fetch(
      `${process.env.VUE_APP_API_URL}/applications`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching applications:", error);
    throw new Error("Unable to fetch applications.");
  }
}

export async function deleteApplication(id: number): Promise<void> {
  const token = localStorage.getItem("access_token");
  if (!token) {
    throw new Error("Authentication token is missing.");
  }

  await axios.delete(`${process.env.VUE_APP_API_URL}/applications/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function createApplication(
  application: Application
): Promise<void> {
  const token = localStorage.getItem("access_token");
  if (!token) {
    throw new Error("Authentication token is missing.");
  }

  await axios.post(`${process.env.VUE_APP_API_URL}/applications`, application, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
