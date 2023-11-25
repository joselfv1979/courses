import { initialUser, User } from "@/models/User";
import { State as RootState } from "../../index";
import {
  Module,
  Store as VuexStore,
  CommitOptions,
  DispatchOptions,
} from "vuex";
import { actions, Actions } from "./UserActions";
import { getters, Getters } from "./UserGetters";
import { mutations, Mutations } from "./UserMutations";
import { Message } from "@/models/Message";

export type State = {
  users: Array<User>;
  user: User;
  error: string | null;
  message?: Message;
  status: string;
};

const state: State = {
  users: [],
  user: initialUser,
  error: null,
  status: "idle" || "loading" || "succeeded" || "failed",
};

//setup store type
export type UserStore<S = State> = Omit<
  VuexStore<S>,
  "commit" | "getters" | "dispatch"
> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>;
} & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>;
  };
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload?: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>;
};

export const UserModule: Module<State, RootState> = {
  // namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
