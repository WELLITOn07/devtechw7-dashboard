import axios from "axios";
import { getAuthHeaders } from "@/utils/get-auth-headers";
import { Advertisement } from "@/models/advertisement.model";

export const fetchAdvertisements = async (): Promise<Advertisement[]> => {
  const response = await axios.get(
    `${process.env.VUE_APP_API_URL}/advertisements`,
    getAuthHeaders()
  );
  return response.data.data || [];
};

export const createAdvertisement = async (
  advertisement: Advertisement
): Promise<Advertisement> => {
  const response = await axios.post(
    `${process.env.VUE_APP_API_URL}/advertisements`,
    advertisement,
    getAuthHeaders()
  );
  return response.data.data;
};

export const updateAdvertisement = async (
  id: number,
  advertisement: Advertisement
): Promise<Advertisement> => {
  const response = await axios.put(
    `${process.env.VUE_APP_API_URL}/advertisements/${id}`,
    advertisement,
    getAuthHeaders()
  );
  return response.data.data;
};

export const deleteAdvertisement = async (id: number): Promise<void> => {
  await axios.delete(
    `${process.env.VUE_APP_API_URL}/advertisements/${id}`,
    getAuthHeaders()
  );
};
