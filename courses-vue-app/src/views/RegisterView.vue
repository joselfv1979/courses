<template>
  <div class="container">
    <div v-if="message">
      <message-component :message="message" @close="closeMessage" />
    </div>
    <UserForm :editing="editing" @submit-validate="register" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import UserForm from "../components/UserForm.vue";
import MessageComponent from "../components/MessageComponent.vue";
import { useStore } from "vuex";
import { User } from "../models/User";
import { ActionTypes } from "../store/modules/user/UserActions";

export default defineComponent({
  name: "RegisterView",
  components: {
    UserForm,
    MessageComponent,
  },

  setup() {
    const store = useStore();
    const editing = false;
    const message = computed(() => store.getters.getUserMessage);

    const register = (user: User) => {
      store.dispatch(ActionTypes.ADD_USER, user);
    };
    const closeMessage = () => store.dispatch(ActionTypes.CLOSE_USER_MESSAGE);
    return {
      editing,
      register,
      closeMessage,
      message,
    };
  },
});
</script>

<style scoped></style>
