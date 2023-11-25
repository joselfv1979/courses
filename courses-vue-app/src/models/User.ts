import { Course } from "./Course";

export interface User {
  id: string;
  username: string;
  fullname: string;
  password: string;
  email: string;
  roles: string[];
  token?: string;
  courses?: Course[];
}

export const initialUser: User = {
  id: "",
  username: "",
  fullname: "",
  password: "",
  email: "",
  roles: [],
};
