import { initialUser, User } from "@/models/User";
import { MutationTree } from "vuex";
import { State } from "./UserModule";

// mutations

export enum MutationTypes {
  ADD_USER = "ADD_USER",
  ADD_USER_SUCCESS = "ADD_USER_SUCCESS",
  ADD_USER_FAIL = "ADD_USER_FAIL",
  SET_USERS = "SET_USERS",
  SET_USERS_SUCCESS = "SET_USERS_SUCCESS",
  SET_USERS_FAIL = "SET_USERS_FAIL",
  DELETE_USER = "DELETE_USER",
  DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS",
  DELETE_USER_FAIL = "DELETE_USER_FAIL",
  UPDATE_USER = "UPDATE_USER",
  UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS",
  UPDATE_USER_FAIL = "UPDATE_USER_FAIL",
  SET_USER = "SET_USER",
  SET_USER_SUCCESS = "SET_USER_SUCCESS",
  SET_USER_FAIL = "SET_USER_FAIL",
  CLOSE_USER_MESSAGE = "CLOSE_USER_MESSAGE",
  CLEAR_USER = "CLEAR_USER",
}

//Mutation Types
export type Mutations<S = State> = {
  [MutationTypes.ADD_USER](state: S): void;
  [MutationTypes.ADD_USER_SUCCESS](state: S, payload: User): void;
  [MutationTypes.ADD_USER_FAIL](state: S, payload: string): void;
  [MutationTypes.SET_USERS](state: S): void;
  [MutationTypes.SET_USERS_SUCCESS](state: S, payload: User[]): void;
  [MutationTypes.SET_USERS_FAIL](state: S, payload: string): void;
  [MutationTypes.DELETE_USER](state: S): void;
  [MutationTypes.DELETE_USER_SUCCESS](state: S, payload: User): void;
  [MutationTypes.DELETE_USER_FAIL](state: S, payload: string): void;
  [MutationTypes.UPDATE_USER](state: S, payload: User): void;
  [MutationTypes.UPDATE_USER_SUCCESS](state: S, payload: User): void;
  [MutationTypes.UPDATE_USER_FAIL](state: S, payload: string): void;
  [MutationTypes.SET_USER](state: S): void;
  [MutationTypes.SET_USER_SUCCESS](state: S, payload: User): void;
  [MutationTypes.SET_USER_FAIL](state: S, payload: string): void;
  [MutationTypes.CLEAR_USER](state: S): void;
  [MutationTypes.CLOSE_USER_MESSAGE](state: S): void;
};

//define mutations
export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.ADD_USER](state: State) {
    state.status = "loading";
  },
  [MutationTypes.ADD_USER_SUCCESS](state: State, payload: User) {
    state.users = [...state.users, payload];
    state.status = "succeeded";
    state.message = { success: true, text: "User added" };
  },
  [MutationTypes.ADD_USER_FAIL](state: State, payload: string) {
    state.status = "fail";
    state.message = { success: false, text: payload };
  },
  [MutationTypes.SET_USERS](state: State) {
    state.status = "loading";
  },
  [MutationTypes.SET_USERS_SUCCESS](state: State, payload: User[]) {
    state.users = payload;
    state.status = "succeeded";
  },
  [MutationTypes.SET_USERS_FAIL](state: State, payload: string) {
    state.status = "failed";
    state.message = { success: false, text: payload };
  },
  [MutationTypes.DELETE_USER](state: State) {
    state.status = "loading";
  },
  [MutationTypes.DELETE_USER_SUCCESS](state: State, payload: User) {
    state.users = state.users.filter((item: User) => item.id !== payload.id);
    state.message = { success: true, text: "User deleted" };
  },
  [MutationTypes.DELETE_USER_FAIL](state: State, payload: string) {
    state.status = "fail";
    state.message = { success: false, text: payload };
  },
  [MutationTypes.UPDATE_USER](state: State) {
    state.status = "loading";
  },
  [MutationTypes.UPDATE_USER_SUCCESS](state: State, payload: User) {
    state.users = state.users.map((item: User) =>
      item.id === payload.id ? payload : item
    );
    state.user = payload;
    state.message = { success: true, text: "User updated" };
  },
  [MutationTypes.UPDATE_USER_FAIL](state: State, payload: string) {
    state.status = "fail";
    state.message = { success: false, text: payload };
  },
  [MutationTypes.SET_USER](state: State) {
    state.status = "loading";
  },
  [MutationTypes.SET_USER_SUCCESS](state: State, payload: User) {
    state.user = payload;
    state.status = "succeeded";
  },
  [MutationTypes.SET_USER_FAIL](state: State, payload: string) {
    state.status = "failed";
    state.message = { success: false, text: payload };
  },
  [MutationTypes.CLEAR_USER](state: State) {
    state.user = initialUser;
  },
  [MutationTypes.CLOSE_USER_MESSAGE](state: State) {
    state.message = undefined;
  },
};
