import { User } from "@/models/User";
import { MutationTree } from "vuex";
import { State } from "./LoginModule";

// mutations

export enum MutationTypes {
  LOGIN_USER = "LOGIN_USER",
  LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS",
  LOGIN_USER_FAIL = "LOGIN_USER_FAIL",
  LOGOUT_USER = "LOGOUT_USER",
  CLOSE_LOGIN_MESSAGE = "CLOSE_LOGIN_MESSAGE",
}

//Mutation Types
export type Mutations<S = State> = {
  [MutationTypes.LOGIN_USER](state: S): void;
  [MutationTypes.LOGIN_USER_SUCCESS](state: S, payload: User): void;
  [MutationTypes.LOGIN_USER_FAIL](state: S, payload: string): void;
  [MutationTypes.LOGOUT_USER](state: S): void;
  [MutationTypes.CLOSE_LOGIN_MESSAGE](state: S): void;
};

//define mutations
export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.LOGIN_USER](state: State) {
    state.status = "loading";
  },
  [MutationTypes.LOGIN_USER_SUCCESS](state: State, payload: User) {
    state.user = payload;
    state.status = "succeeded";
  },
  [MutationTypes.LOGIN_USER_FAIL](state: State, payload: string) {
    state.status = "fail";
    state.message = { success: false, text: payload };
  },
  [MutationTypes.LOGOUT_USER](state: State) {
    state.user = null;
  },
  [MutationTypes.CLOSE_LOGIN_MESSAGE](state: State) {
    state.message = null;
  },
};
