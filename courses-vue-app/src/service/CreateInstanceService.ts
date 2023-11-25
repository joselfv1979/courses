import axios from "axios";

export const setToken = () => {
  const state = localStorage.getItem("vuex");

  const savedState = state ? JSON.parse(state) : null;

  const loggedUser = state ? savedState.LoginModule.user : null;
  const storedtoken = loggedUser ? loggedUser.token : null;

  return `Bearer ${storedtoken}`;
};

const token = setToken();

export const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: { Authorization: token },
});
