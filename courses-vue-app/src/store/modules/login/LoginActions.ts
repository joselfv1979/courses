import { Mutations, MutationTypes } from "./LoginMutations";
import { ActionContext, ActionTree } from "vuex";
import { State as RootState } from "../../index";
import { State } from "./LoginModule";
import { Auth } from "@/models/Auth";
import { validateLoginData } from "@/utils/validateLogin";
import UserDataService, { loginUser } from "@/service/UserDataService";
import { setToken } from "@/service/CreateInstanceService";

export enum ActionTypes {
  LOGIN_USER = "LOGIN_USER",
  LOGOUT_USER = "LOGOUT_USER",
  CLOSE_LOGIN_MESSAGE = "CLOSE_LOGIN_MESSAGE",
}

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload?: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, RootState>, "commit">;

export interface Actions {
  [ActionTypes.LOGIN_USER](
    { commit }: AugmentedActionContext,
    payload: Auth
  ): void;
  [ActionTypes.LOGOUT_USER]({ commit }: AugmentedActionContext): void;
  [ActionTypes.CLOSE_LOGIN_MESSAGE]({ commit }: AugmentedActionContext): void;
}

export const actions: ActionTree<State, RootState> & Actions = {
  async [ActionTypes.LOGIN_USER]({ commit }, payload: Auth) {
    const validLogin = validateLoginData(payload);
    if (!validLogin.success) {
      commit(MutationTypes.LOGIN_USER_FAIL, validLogin.message);
      return;
    }

    commit(MutationTypes.LOGIN_USER);

    const response = await loginUser(payload);
    if (response.success) {
      commit(MutationTypes.LOGIN_USER_SUCCESS, response.value);
      setToken();
    } else {
      commit(MutationTypes.LOGIN_USER_FAIL, response.message);
    }
  },

  [ActionTypes.LOGOUT_USER]({ commit }) {
    commit(MutationTypes.LOGOUT_USER);
    UserDataService.logout();
  },
  [ActionTypes.CLOSE_LOGIN_MESSAGE]({ commit }) {
    commit(MutationTypes.CLOSE_LOGIN_MESSAGE);
  },
};
