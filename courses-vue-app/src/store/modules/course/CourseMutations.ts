import { Course } from "@/models/Course";
import { MutationTree } from "vuex";
import { State } from "./CourseModule";

// mutations

export enum MutationTypes {
  ADD_COURSE = "ADD_COURSE",
  ADD_COURSE_SUCCESS = "ADD_COURSE_SUCCESS",
  ADD_COURSE_FAIL = "ADD_COURSE_FAIL",
  SET_COURSES = "SET_COURSES",
  SET_COURSES_SUCCESS = "SET_COURSES_SUCCESS",
  SET_COURSES_FAIL = "SET_COURSES_FAIL",
  DELETE_COURSE = "DELETE_COURSE",
  DELETE_COURSE_SUCCESS = "DELETE_COURSE_SUCCESS",
  DELETE_COURSE_FAIL = "DELETE_COURSE_FAIL",
  UPDATE_COURSE = "UPDATE_COURSE",
  UPDATE_COURSE_SUCCESS = "UPDATE_COURSE_SUCCESS",
  UPDATE_COURSE_FAIL = "UPDATE_COURSE_FAIL",
  SET_COURSE = "SET_COURSE",
  SET_COURSE_SUCCESS = "SET_COURSE_SUCCESS",
  SET_COURSE_FAIL = "SET_COURSE_FAIL",
  CLOSE_COURSE_MESSAGE = "CLOSE_COURSE_MESSAGE",
}

//Mutation Types
export type Mutations<S = State> = {
  [MutationTypes.ADD_COURSE](state: S): void;
  [MutationTypes.ADD_COURSE_SUCCESS](state: S, payload: Course): void;
  [MutationTypes.ADD_COURSE_FAIL](state: S, payload: string): void;
  [MutationTypes.SET_COURSES](state: S): void;
  [MutationTypes.SET_COURSES_SUCCESS](state: S, payload: Course[]): void;
  [MutationTypes.SET_COURSES_FAIL](state: S, payload: string): void;
  [MutationTypes.DELETE_COURSE](state: S): void;
  [MutationTypes.DELETE_COURSE_SUCCESS](state: S, payload: Course): void;
  [MutationTypes.DELETE_COURSE_FAIL](state: S, payload: string): void;
  [MutationTypes.UPDATE_COURSE](state: S): void;
  [MutationTypes.UPDATE_COURSE_SUCCESS](state: S, payload: Course): void;
  [MutationTypes.UPDATE_COURSE_FAIL](state: S, payload: string): void;
  [MutationTypes.SET_COURSE](state: S, payload: Course): void;
  [MutationTypes.SET_COURSE_SUCCESS](state: S, payload: Course): void;
  [MutationTypes.SET_COURSE_FAIL](state: S, payload: string): void;
  [MutationTypes.CLOSE_COURSE_MESSAGE](state: S): void;
};

//define mutations
export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.ADD_COURSE](state: State) {
    state.status = "loading";
  },
  [MutationTypes.ADD_COURSE_SUCCESS](state: State, payload: Course) {
    state.courses = [...state.courses, payload];
    state.status = "succeeded";
    state.message = { success: true, text: "Course added" };
  },
  [MutationTypes.ADD_COURSE_FAIL](state: State, payload: string) {
    state.status = "fail";
    state.message = { success: false, text: payload };
  },
  [MutationTypes.SET_COURSES](state: State) {
    state.status = "loading";
  },
  [MutationTypes.SET_COURSES_SUCCESS](state: State, payload: Course[]) {
    state.courses = payload;
    state.status = "succeeded";
  },
  [MutationTypes.SET_COURSES_FAIL](state: State, payload: string) {
    state.status = "failed";
    state.message = { success: false, text: payload };
  },
  [MutationTypes.DELETE_COURSE](state: State) {
    state.status = "loading";
  },
  [MutationTypes.DELETE_COURSE_SUCCESS](state: State, payload: Course) {
    state.courses = state.courses.filter(
      (item: Course) => item.id !== payload.id
    );
    state.status = "succeeded";
    state.message = { success: true, text: "Course deleted" };
  },
  [MutationTypes.DELETE_COURSE_FAIL](state: State, payload: string) {
    state.status = "fail";
    state.message = { success: false, text: payload };
  },
  [MutationTypes.UPDATE_COURSE](state: State) {
    state.status = "loading";
  },
  [MutationTypes.UPDATE_COURSE_SUCCESS](state: State, payload: Course) {
    state.courses = state.courses.map((item: Course) =>
      item.id === payload.id ? payload : item
    );
    state.message = { success: true, text: "Course updated" };
  },
  [MutationTypes.UPDATE_COURSE_FAIL](state: State, payload: string) {
    state.status = "fail";
    state.message = { success: false, text: payload };
  },
  [MutationTypes.SET_COURSE](state: State) {
    state.status = "loading";
  },
  [MutationTypes.SET_COURSE_SUCCESS](state: State, payload: Course) {
    state.course = payload;
    state.status = "succeeded";
  },
  [MutationTypes.SET_COURSE_FAIL](state: State, payload: string) {
    state.status = "failed";
    state.message = { success: false, text: payload };
  },
  [MutationTypes.CLOSE_COURSE_MESSAGE](state: State) {
    state.message = undefined;
  },
};
