// src/services/applicationService.ts
import { Application } from "@/models/application.model";

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
