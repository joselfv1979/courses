<template>
  <div class="container">
    <div v-if="message">
      <message-component :message="message" @close="closeMessage" />
    </div>
    <div v-if="status === 'loading'">
      <loading-component />
    </div>
    <div v-else class="container">
      <h3>Login</h3>
      <form>
        <div class="form-group">
          <label for="username">Username</label>
          <input
            type="text"
            name="username"
            v-model="username"
            class="form-control"
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            name="password"
            v-model="password"
            class="form-control"
          />
        </div>
      </form>
      <button @click="login" class="btn btn-success">Login</button>
    </div>
  </div>
</template>

<script lang="ts">
import MessageComponent from "../components/MessageComponent.vue";
import { computed, defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import LoadingComponent from "../components/LoadingComponent.vue";
import { useStore } from "../store";
import { ActionTypes } from "../store/modules/login/LoginActions";

export default defineComponent({
  name: "LoginView",
  components: {
    MessageComponent,
    LoadingComponent,
  },
  setup() {
    const username = ref("");
    const password = ref("");
    const store = useStore();
    const router = useRouter();
    const status = computed(() => store.getters.getLoginStatus);
    const message = computed(() => store.getters.getLoginMessage);

    const login = async () => {
      await store.dispatch(ActionTypes.LOGIN_USER, {
        username: username.value,
        password: password.value,
      });

      if (status.value === "succeeded") {
        router.push({ name: "HomeView" });
      }
    };

    const closeMessage = () => {
      store.dispatch(ActionTypes.CLOSE_LOGIN_MESSAGE);
    };

    return {
      username,
      password,
      status,
      message,
      login,
      closeMessage,
    };
  },
});
</script>

<style scoped>
.form-group {
  margin-bottom: 1rem;
}

label {
  margin-bottom: 0.5rem;
}
</style>
