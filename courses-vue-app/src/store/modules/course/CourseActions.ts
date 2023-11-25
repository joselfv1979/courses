import { Course } from "@/models/Course";
import { Message } from "@/models/Message";
import {
  createCourse,
  deleteCourse,
  retrieveAllCourses,
  retrieveCourse,
  updateCourse,
} from "@/service/CourseDataService";
import { validateCourse } from "@/utils/validateCourse";
import { ActionContext, ActionTree } from "vuex";
import { State as RootState } from "../../index";
import { State } from "./CourseModule";
import { Mutations, MutationTypes } from "./CourseMutations";

export enum ActionTypes {
  ADD_COURSE = "ADD_COURSE",
  ADD_COURSE_SUCCESS = "ADD_COURSE_SUCCESS",
  ADD_COURSE_FAIL = "ADD_COURSE_FAIL",
  FETCH_COURSES = "FETCH_COURSES",
  DELETE_COURSE = "DELETE_COURSE",
  UPDATE_COURSE = "UPDATE_COURSE",
  FETCH_COURSE = "FETCH_COURSE",
  CLOSE_COURSE_MESSAGE = "CLOSE_COURSE_MESSAGE",
}

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload?: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, RootState>, "commit">;

export interface Actions {
  [ActionTypes.ADD_COURSE](
    { commit }: AugmentedActionContext,
    payload: Course
  ): void;
  [ActionTypes.FETCH_COURSES]({ commit }: AugmentedActionContext): void;
  [ActionTypes.DELETE_COURSE](
    { commit }: AugmentedActionContext,
    payload: Course
  ): void;
  [ActionTypes.UPDATE_COURSE](
    { commit }: AugmentedActionContext,
    payload: Course
  ): void;
  [ActionTypes.FETCH_COURSE](
    { commit }: AugmentedActionContext,
    payload: string
  ): void;
  [ActionTypes.CLOSE_COURSE_MESSAGE](
    { commit }: AugmentedActionContext,
    payload: Message
  ): void;
}

export const actions: ActionTree<State, RootState> & Actions = {
  async [ActionTypes.ADD_COURSE]({ commit }, payload: Course) {
    const validCourse = validateCourse(payload);
    if (!validCourse.success) {
      commit(MutationTypes.ADD_COURSE_FAIL, validCourse.message);
      return;
    }

    commit(MutationTypes.ADD_COURSE);

    const response = await createCourse(payload);
    response.success
      ? commit(MutationTypes.ADD_COURSE_SUCCESS, response.value)
      : commit(MutationTypes.ADD_COURSE_FAIL, response.message);
  },

  async [ActionTypes.FETCH_COURSES]({ commit }) {
    commit(MutationTypes.SET_COURSES);

    const response = await retrieveAllCourses();
    response.success
      ? commit(MutationTypes.SET_COURSES_SUCCESS, response.value)
      : commit(MutationTypes.SET_COURSES_FAIL, response.message);
  },

  async [ActionTypes.DELETE_COURSE]({ commit }, payload: Course) {
    commit(MutationTypes.DELETE_COURSE);

    const response = await deleteCourse(payload.id);
    response.success
      ? commit(MutationTypes.DELETE_COURSE_SUCCESS, payload)
      : commit(MutationTypes.DELETE_COURSE_FAIL, response.message);
  },

  async [ActionTypes.UPDATE_COURSE]({ commit }, payload: Course) {
    const validCourse = validateCourse(payload);
    if (!validCourse.success) {
      commit(MutationTypes.UPDATE_COURSE_FAIL, validCourse.message);
      return;
    }

    commit(MutationTypes.UPDATE_COURSE);

    const response = await updateCourse(payload.id, payload);
    response.success
      ? commit(MutationTypes.UPDATE_COURSE_SUCCESS, response.value)
      : commit(MutationTypes.UPDATE_COURSE_FAIL, response.message);
  },

  async [ActionTypes.FETCH_COURSE]({ commit }, id: string) {
    commit(MutationTypes.SET_COURSE);

    const response = await retrieveCourse(id);
    response.success
      ? commit(MutationTypes.SET_COURSE_SUCCESS, response.value)
      : commit(MutationTypes.SET_COURSE_FAIL, response.message);
  },

  [ActionTypes.CLOSE_COURSE_MESSAGE]({ commit }, message: Message) {
    message.success
      ? setTimeout(() => {
          commit(MutationTypes.CLOSE_COURSE_MESSAGE);
        }, 4000)
      : commit(MutationTypes.CLOSE_COURSE_MESSAGE);
  },
};
