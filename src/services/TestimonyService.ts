import axios from "axios";
import { Testimony } from "@/models/testimony.model";
import { getAuthHeaders } from "@/utils/get-auth-headers";

const BASE_URL = process.env.VUE_APP_API_URL || "http://localhost:3000";

export async function fetchTestimonies(): Promise<Testimony[]> {
  const response = await axios.get(`${BASE_URL}/testimonies`, getAuthHeaders());
  return response.data.data || [];
}

export async function createTestimony(
  testimony: Testimony
): Promise<Testimony> {
  const response = await axios.post(
    `${BASE_URL}/testimonies`,
    testimony,
    getAuthHeaders()
  );
  return response.data.data;
}

export async function updateTestimony(
  testimonyId: number | string,
  testimony: Testimony
): Promise<Testimony> {
  const response = await axios.put(
    `${BASE_URL}/testimonies/${testimonyId}`,
    testimony,
    getAuthHeaders()
  );
  return response.data.data;
}

export async function deleteTestimony(
  testimonyId: number | string
): Promise<void> {
  await axios.delete(
    `${BASE_URL}/testimonies/${testimonyId}`,
    getAuthHeaders()
  );
}
