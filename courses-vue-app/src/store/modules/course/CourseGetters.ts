import { Course } from "@/models/Course";
import { Message } from "@/models/Message";
import { GetterTree } from "vuex";
import { State as RootState } from "../../index";
import { State } from "./CourseModule";

// Getters types
export type Getters = {
  getCourses(state: State): Course[];
  getCourse(state: State): Course;
  getCourseStatus(state: State): string;
  getCourseMessage(state: State): Message | undefined;
};

//getters

export const getters: GetterTree<State, RootState> & Getters = {
  getCourses: (state) => {
    return state.courses;
  },
  getCourse: (state) => {
    return state.course;
  },
  getCourseStatus: (state) => {
    return state.status;
  },
  getCourseMessage: (state) => {
    return state.message;
  },
};
