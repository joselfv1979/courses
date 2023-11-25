import { Course } from "@/models/Course";
import { Result } from "@/models/Result";

export const validateCourse = (course: Course): Result<Course, string> => {
  if (!course.description) {
    return {
      success: false,
      message: "Enter at least 5 characters in Description",
    };
  } else if (!course.language) {
    return {
      success: false,
      message: "Enter valid values in Language",
    };
  } else if (!course.format) {
    return {
      success: false,
      message: "Choose one format",
    };
  } else if (!course.price) {
    return {
      success: false,
      message: "Enter valid values in Price",
    };
  } else if (isNaN(course.price)) {
    return {
      success: false,
      message: "Enter a number value in Price",
    };
  } else if (course.price >= 1000) {
    return {
      success: false,
      message: "Price must be less than 1000",
    };
  }
  return { success: true, value: course };
};
