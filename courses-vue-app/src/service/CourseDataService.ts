// FUNCIONES ACCESORIAS (PETICIONES A LA BD Y VALIDACIÓN DE CURSOS)
import { Course } from "@/models/Course";
import { Result } from "@/models/Result";
import { handleError } from "@/utils/handleError";
import { instance } from "./CreateInstanceService";

export const retrieveAllCourses = async (): Promise<
  Result<Course[], string>
> => {
  try {
    const { data } = await instance.get(`/courses`);
    return { success: true, value: data };
  } catch (error) {
    return { success: false, message: handleError(error) };
  }
};

export const retrieveCourse = async (
  id: string
): Promise<Result<Course, string>> => {
  try {
    const { data } = await instance.get(`/courses/${id}`);
    return { success: true, value: data };
  } catch (error) {
    return { success: false, message: handleError(error) };
  }
};

export const createCourse = async (
  course: Course
): Promise<Result<Course, string>> => {
  try {
    const { data } = await instance.post(`/courses`, course);
    return { success: true, value: data };
  } catch (error) {
    return { success: false, message: handleError(error) };
  }
};

export const updateCourse = async (
  id: string,
  course: Course
): Promise<Result<Course, string>> => {
  try {
    const { data } = await instance.put(`/courses/${id}`, course);
    return { success: true, value: data };
  } catch (error) {
    return { success: false, message: handleError(error) };
  }
};

export const deleteCourse = async (
  id: string
): Promise<Result<Course, string>> => {
  try {
    const { data } = await instance.delete(`/courses/${id}`);
    return { success: true, value: data };
  } catch (error) {
    return { success: false, message: handleError(error) };
  }
};

export default {
  retrieveUsersByCourse: (id: string) => {
    return instance.get(`/courses/${id}/users`);
  },
};
