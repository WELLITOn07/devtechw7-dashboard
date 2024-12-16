import { getAuthHeaders } from "@/utils/get-auth-headers";
import axios from "axios";

const API_BASE_URL = `${process.env.VUE_APP_API_URL}/analytics-events`;

export async function fetchAnalyticsEvents() {
  const response = await axios.get(API_BASE_URL, getAuthHeaders());
  return response.data;
}

export async function deleteAllAnalyticsEvents() {
  const response = await axios.delete(`${API_BASE_URL}/all`, getAuthHeaders());
  return response.data;
}

