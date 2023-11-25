<template>
  <div class="container">
    <h3>Create an account</h3>
    <form>
      <div class="form-group">
        <label for="fullname">Fullname</label>
        <input
          type="text"
          name="fullname"
          id="fullname"
          v-model="user.fullname"
          class="form-control"
        />
      </div>
      <div class="form-group">
        <label for="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          v-model="user.username"
          class="form-control"
        />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="text"
          name="email"
          id="email"
          v-model="user.email"
          class="form-control"
        />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          v-model="user.password"
          class="form-control"
        />
      </div>
    </form>
    <button class="btn btn-success" @click="validate">Submit</button>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, ComputedRef } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { User, initialUser } from "../models/User";

export default defineComponent({
  name: "UserForm",
  props: {
    editing: Boolean,
  },
  setup(props, { emit }) {
    const store = useStore();
    const router = useRouter();

    const auxUser: ComputedRef<User> = computed(() => store.getters.getUser);
    const user = computed(() => (props.editing ? auxUser.value : initialUser));
    const back = () => router.push({ name: "HomeView" });

    const validate = () => emit("submitValidate", user.value);

    return {
      user,
      back,
      validate,
    };
  },
  emits: ["submitValidate"],
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
