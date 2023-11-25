<template>
  <div class="container">
    <div v-if="message">
      <message-component :message="message" @close="closeMessage" />
    </div>
    <CoursesForm :editing="editing" @submit-validate="createCourse" />
  </div>
</template>

<script lang="ts">
import { ActionTypes } from "../store/modules/course/CourseActions";
import { Course } from "../models/Course";
import CoursesForm from "../components/CoursesForm.vue";
import MessageComponent from "../components/MessageComponent.vue";
import { computed, defineComponent } from "vue";
import { useStore } from "../store";

export default defineComponent({
  name: "AddCourseView",
  components: {
    CoursesForm,
    MessageComponent,
  },
  setup() {
    const store = useStore();
    const editing = false;
    const message = computed(() => store.getters.getCourseMessage);

    const createCourse = async (course: Course) => {
      await store.dispatch(ActionTypes.ADD_COURSE, course);
      if (message?.value?.success) {
        closeMessage();
      }
    };
    const closeMessage = () =>
      store.dispatch(ActionTypes.CLOSE_COURSE_MESSAGE, message.value);

    return {
      createCourse,
      closeMessage,
      editing,
      message,
    };
  },
});
</script>
