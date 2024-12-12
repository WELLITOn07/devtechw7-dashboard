import axios from "axios";
import { Course } from "@/models/biomedsandra-api.model";

export async function fetchCourses(): Promise<Course[]> {
  const token = localStorage.getItem("access_token");
  if (!token) {
    throw new Error("Authentication token is missing.");
  }

  const response = await axios.get(`${process.env.VUE_APP_API_URL}/courses`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.data || [];
}

export async function createCourse(course: Partial<Course>): Promise<Course> {
  const token = localStorage.getItem("access_token");
  if (!token) {
    throw new Error("Authentication token is missing.");
  }

  const response = await axios.post(
    `${process.env.VUE_APP_API_URL}/courses`,
    course,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.data;
}
