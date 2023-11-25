import { Message } from "@/models/Message";
import { User } from "@/models/User";
import { State as RootState } from "../../index";
import {
  Module,
  Store as VuexStore,
  CommitOptions,
  DispatchOptions,
} from "vuex";
import { actions, Actions } from "./LoginActions";
import { getters, Getters } from "./LoginGetters";
import { mutations, Mutations } from "./LoginMutations";

export type State = {
  user: User | null;
  message: Message | null;
  status: string;
};

const state: State = {
  user: null,
  message: null,
  status: "idle" || "loading" || "succeeded" || "failed",
};

//setup store type
export type LoginStore<S = State> = Omit<
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

export const LoginModule: Module<State, RootState> = {
  // namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
