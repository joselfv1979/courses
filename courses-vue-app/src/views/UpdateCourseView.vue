<template>
  <div class="container">
    <div v-if="message">
      <message-component :message="message" @close="closeMessage" />
    </div>
    <CoursesForm :editing="editing" @submit-validate="updateCourse" />
  </div>
</template>

<script lang="ts">
import { ActionTypes } from "../store/modules/course/CourseActions";
import { computed, defineComponent } from "vue";
import { useRoute } from "vue-router";
import CoursesForm from "../components/CoursesForm.vue";
import MessageComponent from "../components/MessageComponent.vue";
import { Course } from "../models/Course";
import { useStore } from "../store";

export default defineComponent({
  name: "UpdateCourseView",
  components: {
    CoursesForm,
    MessageComponent,
  },
  setup() {
    const route = useRoute();
    const id = route.params.id as string;
    const store = useStore();
    const editing = true;
    const message = computed(() => store.getters.getCourseMessage);

    const fetchCourse = (id: string) => {
      store.dispatch(ActionTypes.FETCH_COURSE, id);
    };

    const updateCourse = async (course: Course) => {
      await store.dispatch(ActionTypes.UPDATE_COURSE, course);
      if (message?.value?.success) {
        closeMessage();
      }
    };

    const closeMessage = () =>
      store.dispatch(ActionTypes.CLOSE_COURSE_MESSAGE, message.value);

    return {
      fetchCourse,
      updateCourse,
      closeMessage,
      id,
      editing,
      message,
    };
  },
  mounted() {
    this.fetchCourse(this.id);
  },
});
</script>

<style scoped></style>
