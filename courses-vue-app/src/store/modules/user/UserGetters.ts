import { Message } from "@/models/Message";
import { User } from "@/models/User";
import { GetterTree } from "vuex";
import { State as RootState } from "../../index";
import { State } from "./UserModule";

// Getters types
export type Getters = {
  getUsers(state: State): User[];
  getUser(state: State): User;
  getUserStatus(state: State): string;
  getUserMessage(state: State): Message | undefined;
};

//getters

export const getters: GetterTree<State, RootState> & Getters = {
  getUsers: (state) => {
    return state.users;
  },
  getUser: (state) => {
    return state.user;
  },
  getUserStatus: (state) => {
    return state.status;
  },
  getUserMessage: (state) => {
    return state.message;
  },
};
