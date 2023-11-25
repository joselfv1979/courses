import { Message } from "@/models/Message";
import { State } from "./LoginModule";
import { State as RootState } from "../../index";
import { GetterTree } from "vuex";
import { User } from "@/models/User";

// Getters types
export type Getters = {
  getLoginStatus(state: State): string;
  getLoginMessage(state: State): Message | null;
  getLoggedUser(state: State): User | null;
};

//getters

export const getters: GetterTree<State, RootState> & Getters = {
  getLoginStatus: (state) => {
    return state.status;
  },

  getLoginMessage: (state) => {
    return state.message;
  },
  getLoggedUser: (state) => {
    return state.user;
  },
};
