import { createStore, createLogger } from "vuex";
import VuexPersistence from "vuex-persist";
import {
  CourseStore,
  CourseModule,
  State as CoursesState,
} from "./modules/course/CourseModule";
import {
  LoginStore,
  LoginModule,
  State as LoginState,
} from "./modules/login/LoginModule";
import {
  UserStore,
  UserModule,
  State as UserState,
} from "./modules/user/UserModule";

export type State = {
  courses: CoursesState;
  users: UserState;
  login: LoginState;
};

export type Store = CourseStore<Pick<State, "courses">> &
  UserStore<Pick<State, "users">> &
  LoginStore<Pick<State, "login">>;

const vuexLocal = new VuexPersistence<State>({
  storage: window.localStorage,
});

export const store = createStore({
  modules: {
    CourseModule,
    UserModule,
    LoginModule,
  },
  plugins: [vuexLocal.plugin, createLogger()],
});

export function useStore(): Store {
  return store as Store;
}
