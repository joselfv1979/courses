<template>
  <div class="container">
    <div v-if="message">
      <message-component :message="message" @close="closeMessage" />
    </div>
    <UserForm :editing="editing" @submit-validate="updateUser" />
  </div>
</template>

<script lang="ts">
import { ActionTypes } from "../store/modules/user/UserActions";
import { computed, defineComponent } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import UserForm from "../components/UserForm.vue";
import MessageComponent from "../components/MessageComponent.vue";
import { User } from "../models/User";

export default defineComponent({
  name: "UpdateUserView",
  components: {
    UserForm,
    MessageComponent,
  },
  setup() {
    const route = useRoute();
    const id = route.params.id as string;
    const store = useStore();
    const editing = true;
    const message = computed(() => store.getters.getUserMessage);

    const fetchUser = (id: string) => {
      store.dispatch(ActionTypes.FETCH_USER, id);
    };

    const updateUser = (user: User) => {
      store.dispatch(ActionTypes.UPDATE_USER, user);
    };

    const closeMessage = () => store.dispatch(ActionTypes.CLOSE_USER_MESSAGE);

    return {
      fetchUser,
      updateUser,
      closeMessage,
      id,
      editing,
      message,
    };
  },
  mounted() {
    this.fetchUser(this.id);
  },
});
</script>

<style scoped></style>
