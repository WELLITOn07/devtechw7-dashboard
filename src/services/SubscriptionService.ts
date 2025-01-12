import axios from "axios";
import { getAuthHeaders } from "@/utils/get-auth-headers";
import { Subscription } from "@/models/subscription.model";

const BASE_URL = process.env.VUE_APP_API_URL || "http://localhost:3000";

export const createSubscription = async (subscription: Subscription) => {
  const response = await axios.post(
    `${BASE_URL}/subscriptions`,
    subscription,
    getAuthHeaders()
  );
  return response.data.data;
};

export const fetchSubscriptions = async () => {
  const response = await axios.get(
    `${BASE_URL}/subscriptions`,
    getAuthHeaders()
  );
  return response.data.data || [];
};

export const deleteSubscription = async (id: number) => {
  await axios.delete(`${BASE_URL}/subscriptions/${id}`, getAuthHeaders());
};

export const updateSubscription = async (id: number, data: Subscription) => {
  const response = await axios.put(
    `${BASE_URL}/subscriptions/${id}`,
    data,
    getAuthHeaders()
  );
  return response.data.data;
};
