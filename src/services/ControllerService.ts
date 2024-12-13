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

export async function fetchControllerData(
  controllerName: string
): Promise<{ name: string; data: Record<string, any> }> {
  try {
    const response = await fetch(
      `${process.env.VUE_APP_API_URL}/${controllerName}`,
      getAuthHeaders()
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch data for controller: ${controllerName}`);
    }

    const data = await response.json();
    return { name: controllerName, data: data.data };
  } catch (error) {
    console.error(`Error fetching controller ${controllerName}:`, error);
    throw error;
  }
}
