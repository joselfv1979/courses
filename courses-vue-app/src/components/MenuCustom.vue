<!-- MENÚ CON NAVEGADOR -->
<template>
  <div>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark">
      <div>
        <a
          href="https://github.com/joselfv1979/courses_project"
          class="navbar-brand"
          >JoseGithub</a
        >
      </div>
      <ul class="navbar-nav">
        <li>
          <router-link class="nav-link" :to="{ name: 'HomeView' }"
            >Courses</router-link
          >
        </li>
      </ul>
      <ul class="navbar-nav">
        <li>
          <router-link class="nav-link" :to="{ name: 'AboutView' }"
            >About</router-link
          >
        </li>
      </ul>
      <ul class="navbar-nav" v-if="!loggedUser">
        <li>
          <router-link class="nav-link" :to="{ name: 'RegisterView' }"
            >Registration</router-link
          >
        </li>
      </ul>
      <ul class="navbar-nav" v-if="isAdmin">
        <li>
          <router-link class="nav-link" :to="{ name: 'AddCourseView' }"
            >Add Course</router-link
          >
        </li>
      </ul>
      <!-- <ul class="navbar-nav">
        <li>
          <router-link class="nav-link" :to="{ name: 'Users' }"
            >Users</router-link
          >
        </li>
      </ul>
      <ul class="navbar-nav">
        <li>
          <router-link class="nav-link" :to="{ name: 'MyCourses' }"
            >My Courses</router-link
          >
        </li>
      </ul> -->
      <ul
        class="navbar-nav navbar-collapse justify-content-end"
        v-if="loggedUser"
      >
        <li class="nav-username">Hello, {{ loggedUser.username }}</li>
        <li @click="logout">
          <router-link class="nav-link" :to="{ name: 'HomeView' }"
            >Logout</router-link
          >
        </li>
      </ul>
      <ul class="navbar-nav navbar-collapse justify-content-end" v-else>
        <li>
          <router-link class="nav-link" :to="{ name: 'LoginView' }"
            >Login</router-link
          >
        </li>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "../store";
import { ActionTypes as LoginTypes } from "../store/modules/login/LoginActions";
import { ActionTypes as UserTypes } from "../store/modules/user/UserActions";

export default defineComponent({
  name: "MenuCustom",

  setup() {
    const store = useStore();
    const loggedUser = computed(() => store.getters.getLoggedUser);
    const logout = () => {
      store.dispatch(LoginTypes.LOGOUT_USER);
      store.dispatch(UserTypes.CLEAR_USER);
    };

    const isAdmin = computed(() => {
      return loggedUser?.value?.roles[0] === "admin";
    });

    return {
      logout,
      loggedUser,
      isAdmin,
    };
  },
});
</script>

<style scoped>
nav {
  display: flex;
  padding: 0.5rem 1rem;
}

.nav-username {
  color: white;
}
</style>
