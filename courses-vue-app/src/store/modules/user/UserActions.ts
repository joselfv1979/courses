import { Course } from "@/models/Course";
import { User } from "@/models/User";
import {
  addCourseToUser,
  createUser,
  deleteUser,
  retrieveAllUsers,
  retrieveUser,
  updateUser,
} from "@/service/UserDataService";
import { validateUser } from "@/utils/validateUser";
import { ActionContext, ActionTree } from "vuex";
import { State as RootState } from "../../index";
import { State } from "./UserModule";
import { Mutations, MutationTypes } from "./UserMutations";

export enum ActionTypes {
  ADD_USER = "ADD_USER",
  ADD_COURSE_USER = "ADD_COURSE_USER",
  FETCH_USERS = "FETCH_USERS",
  DELETE_USER = "DELETE_USER",
  UPDATE_USER = "UPDATE_USER",
  FETCH_USER = "FETCH_USER",
  CLEAR_USER = "CLEAR_USER",
  CLOSE_USER_MESSAGE = "CLOSE_USER_MESSAGE",
}

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload?: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, RootState>, "commit">;

export interface Actions {
  [ActionTypes.ADD_USER](
    { commit }: AugmentedActionContext,
    payload: User
  ): void;
  [ActionTypes.FETCH_USERS]({ commit }: AugmentedActionContext): void;
  [ActionTypes.DELETE_USER](
    { commit }: AugmentedActionContext,
    payload: User
  ): void;
  [ActionTypes.UPDATE_USER](
    { commit }: AugmentedActionContext,
    payload: User
  ): void;
  [ActionTypes.ADD_COURSE_USER](
    { commit }: AugmentedActionContext,
    payload: { userId: string; course: Course }
  ): void;
  [ActionTypes.FETCH_USER](
    { commit }: AugmentedActionContext,
    id: string
  ): void;
  [ActionTypes.CLEAR_USER]({ commit }: AugmentedActionContext): void;
  [ActionTypes.CLOSE_USER_MESSAGE]({ commit }: AugmentedActionContext): void;
}

export const actions: ActionTree<State, RootState> & Actions = {
  async [ActionTypes.ADD_USER]({ commit }, payload: User) {
    const validUser = validateUser(payload);
    if (!validUser.success) {
      commit(MutationTypes.ADD_USER_FAIL, validUser.message);
      return;
    }
    commit(MutationTypes.ADD_USER);
    const response = await createUser(payload);
    response.success
      ? commit(MutationTypes.ADD_USER_SUCCESS, response.value)
      : commit(MutationTypes.ADD_USER_FAIL, response.message);
  },

  async [ActionTypes.FETCH_USERS]({ commit }) {
    commit(MutationTypes.SET_USERS);

    const response = await retrieveAllUsers();
    response.success
      ? setTimeout(
          () => commit(MutationTypes.SET_USERS_SUCCESS, response.value),
          2000
        )
      : commit(MutationTypes.SET_USERS_FAIL);
  },

  async [ActionTypes.DELETE_USER]({ commit }, payload: User) {
    commit(MutationTypes.DELETE_USER);
    const response = await deleteUser(payload.id);
    response.success
      ? commit(MutationTypes.DELETE_USER_SUCCESS, response.value)
      : commit(MutationTypes.DELETE_USER_FAIL, response.message);
  },

  async [ActionTypes.UPDATE_USER]({ commit }, payload: User) {
    const validUser = validateUser(payload);
    if (!validUser.success) {
      commit(MutationTypes.UPDATE_USER_FAIL, validUser.message);
      return;
    }

    commit(MutationTypes.UPDATE_USER);
    const response = await updateUser(payload);

    response.success
      ? commit(MutationTypes.UPDATE_USER_SUCCESS, response.value)
      : commit(MutationTypes.UPDATE_USER_FAIL, response.message);
  },

  async [ActionTypes.ADD_COURSE_USER]({ commit }, payload) {
    commit(MutationTypes.UPDATE_USER);

    const response = await addCourseToUser(payload.userId, payload.course);

    response.success
      ? commit(MutationTypes.UPDATE_USER_SUCCESS, response.value)
      : commit(MutationTypes.UPDATE_USER_FAIL, response.message);
  },

  async [ActionTypes.FETCH_USER]({ commit }, id: string) {
    commit(MutationTypes.SET_USER);

    const response = await retrieveUser(id);

    response.success
      ? commit(MutationTypes.SET_USER_SUCCESS, response.value)
      : commit(MutationTypes.SET_USERS_FAIL);
  },

  [ActionTypes.CLEAR_USER]({ commit }) {
    commit(MutationTypes.CLEAR_USER);
  },

  [ActionTypes.CLOSE_USER_MESSAGE]({ commit }) {
    commit(MutationTypes.CLOSE_USER_MESSAGE);
  },
};
