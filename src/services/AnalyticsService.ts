import { getAuthHeaders } from "@/utils/get-auth-headers";
import axios from "axios";
import { AnalyticsEvent } from "@/models/analytics-events.model";

const API_BASE_URL = `${process.env.VUE_APP_API_URL}/analytics-events`;

export async function fetchAnalyticsEvents(): Promise<AnalyticsEvent[]> {
  const response = await axios.get<AnalyticsEvent[]>(
    API_BASE_URL,
    getAuthHeaders()
  );
  return response.data;
}

export async function deleteAllAnalyticsEvents(): Promise<void> {
  await axios.delete(`${API_BASE_URL}/all`, getAuthHeaders());
}
