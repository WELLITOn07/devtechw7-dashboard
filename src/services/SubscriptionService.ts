import axios from "axios";
import { getAuthHeaders } from "@/utils/get-auth-headers";
import { Subscription } from "@/models/subscription.model";

const BASE_URL = process.env.VUE_APP_API_URL || "http://localhost:3000";

export const createSubscription = async (subscription: Subscription) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/subscriptions`,
      subscription,
      getAuthHeaders()
    );
    return response.data.data;
  } catch (error: any) {
    throw new Error(
      error.response ? error.response.data.message : "Unknown error"
    );  
  }
};

export const fetchSubscriptions = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/subscriptions`,
      getAuthHeaders()
    );
    return response.data.data || [];
  } catch (error: any) {
    throw new Error(
      error.response ? error.response.data.message : "Unknown error"
    );  
  }
};

export const deleteSubscription = async (id: number) => {
  try {
    await axios.delete(`${BASE_URL}/subscriptions/${id}`, getAuthHeaders());
  } catch (error: any) {
    throw new Error(
      error.response ? error.response.data.message : "Unknown error"
    );  
  }
};

export const updateSubscription = async (id: number, data: Subscription) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/subscriptions/${id}`,
      data,
      getAuthHeaders()
    );
    return response.data.data;
  } catch (error: any) {
    throw new Error(
      error.response ? error.response.data.message : "Unknown error"
    );  
  }
};
