import axios from "axios";
import { Course } from "@/models/biomedsandra-api.model";
import { getAuthHeaders } from "@/utils/get-auth-headers";

export async function fetchCourses(): Promise<Course[]> {
  const response = await axios.get(
    `${process.env.VUE_APP_API_URL}/courses`,
    getAuthHeaders()
  );
  return response.data.data || [];
}

export async function createCourse(course: Course): Promise<Course> {
  const response = await axios.post(
    `${process.env.VUE_APP_API_URL}/courses`,
    course,
    getAuthHeaders()
  );
  return response.data.data;
}

export async function updateCourse(
  courseId: string,
  course: Course
): Promise<Course> {
  const response = await axios.put(
    `${process.env.VUE_APP_API_URL}/courses/${courseId}`,
    course,
    getAuthHeaders()
  );
  return response.data.data;
}

export async function deleteCourse(courseId: string): Promise<void> {
  await axios.delete(
    `${process.env.VUE_APP_API_URL}/courses/${courseId}`,
    getAuthHeaders()
  );
}
