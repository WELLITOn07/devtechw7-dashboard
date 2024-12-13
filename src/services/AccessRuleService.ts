import { getAuthHeaders } from "@/utils/get-auth-headers";
import axios from "axios";
export async function deleteAccessRule(id: number): Promise<void> {
  await axios.delete(
    `${process.env.VUE_APP_API_URL}/access-rules/${id}`,
    getAuthHeaders()
  );
}
