import { Course, initialCourse } from "@/models/Course";
import { State as RootState } from "../../index";
import {
  Module,
  Store as VuexStore,
  CommitOptions,
  DispatchOptions,
} from "vuex";
import { actions, Actions } from "./CourseActions";
import { mutations, Mutations } from "./CourseMutations";
import { Getters, getters } from "./CourseGetters";
import { Message } from "@/models/Message";

export type State = {
  courses: Array<Course>;
  course: Course;
  error: string | null;
  message?: Message;
  status: string;
};

const state: State = {
  courses: [],
  course: initialCourse,
  error: null,
  status: "idle" || "loading" || "succeeded" || "failed",
};

//setup store type
export type CourseStore<S = State> = Omit<
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

export const CourseModule: Module<State, RootState> = {
  // namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
