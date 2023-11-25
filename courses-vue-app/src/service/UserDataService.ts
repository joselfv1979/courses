// FUNCIONES AUXILIARES (PETICIONES A LA BD, MANEJO DEL TOKEN Y VALIDACIÓN DE USUARIOS)
import { Auth } from "@/models/Auth";
import { Course } from "@/models/Course";
import { Result } from "@/models/Result";
import { User } from "@/models/User";
import { handleError } from "@/utils/handleError";
import { instance } from "./CreateInstanceService";

export const createUser = async (user: User): Promise<Result<User, string>> => {
  try {
    const { data } = await instance.post("/users", user);
    return { success: true, value: data };
  } catch (error) {
    return { success: false, message: handleError(error) };
  }
};

export const loginUser = async (user: Auth): Promise<Result<User, string>> => {
  try {
    const { data } = await instance.post("/login", user);
    return { success: true, value: data };
  } catch (error) {
    return { success: false, message: handleError(error) };
  }
};

export const retrieveAllUsers = async (): Promise<Result<User[], string>> => {
  try {
    const { data } = await instance.get("/users");
    return { success: true, value: data };
  } catch (error) {
    return { success: false, message: handleError(error) };
  }
};

export const retrieveUser = async (
  id: string
): Promise<Result<User, string>> => {
  try {
    const response = await instance.get(`/users/${id}`);
    return { success: true, value: response.data };
  } catch (error) {
    return { success: false, message: handleError(error) };
  }
};

export const deleteUser = async (id: string): Promise<Result<User, string>> => {
  try {
    const { data } = await instance.delete(`/users/${id}`);
    return { success: true, value: data };
  } catch (error) {
    return { success: false, message: handleError(error) };
  }
};

export const updateUser = async (user: User): Promise<Result<User, string>> => {
  try {
    const { data } = await instance.put(`/users/${user.id}`, user);
    return { success: true, value: data };
  } catch (error) {
    return { success: false, message: handleError(error) };
  }
};

export const addCourseToUser = async (
  userId: string,
  course: Course
): Promise<Result<User, string>> => {
  try {
    const { data } = await instance.post(`/users/addCourse/${userId}`, course);
    return { success: true, value: data };
  } catch (error) {
    return { success: false, message: handleError(error) };
  }
};

export default {
  retrieveCoursesByUser: (id: string) => {
    return instance.get(`/users/${id}/courses`);
  },

  removeCourseToUser: (id: string, course: Course) => {
    return instance.patch(`/users/${id}/removeCourse`, course);
  },

  logout: () => {
    delete instance.defaults.headers.common["Authorization"];
    localStorage.clear();
  },
};
