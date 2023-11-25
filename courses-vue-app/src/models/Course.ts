export interface Course {
  id: string;
  language: string;
  format: string;
  price: number;
  description: string;
}

export const initialCourse: Course = {
  id: "",
  language: "",
  format: "",
  price: 0,
  description: "",
};
