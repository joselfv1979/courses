<template>
  <div class="container">
    <div v-if="message">
      <message-component :message="message" @close="closeMessage" />
    </div>
    <div v-if="loading">
      <loading-component />
    </div>
    <div v-else class="table-responsive-sm">
      <div v-if="!fetchCourses">Courses not found</div>
      <div v-else>
        <h3>Courses</h3>
        <admin-board
          v-if="isAdmin"
          :courses="courses"
          @remove="deleteCourse"
          @update="updateCourse"
        />
        <user-board v-else :courses="courses" @request="requestCourse" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import LoadingComponent from "../components/LoadingComponent.vue";
import MessageComponent from "../components/MessageComponent.vue";
import AdminBoard from "../components/AdminBoard.vue";
import UserBoard from "../components/UserBoard.vue";
import { Course } from "../models/Course";
import { useStore } from "../store";
import { ActionTypes as CourseTypes } from "../store/modules/course/CourseActions";
import { useRouter } from "vue-router";
import { ActionTypes as UserTypes } from "../store/modules/user/UserActions";

export default defineComponent({
  name: "HomeView",
  components: {
    MessageComponent,
    AdminBoard,
    UserBoard,
    LoadingComponent,
  },

  setup() {
    const store = useStore();
    const router = useRouter();

    const courses = computed(() => store.getters.getCourses);
    const loading = computed(() => store.getters.getCourseStatus === "loading");
    const loggedUser = computed(() => store.getters.getLoggedUser);
    const isAdmin = computed(() => loggedUser?.value?.roles[0] === "admin");
    const message = computed(() => store.getters.getCourseMessage);

    const fetchCourses = () => store.dispatch(CourseTypes.FETCH_COURSES);

    const fetchUser = () =>
      store.dispatch(UserTypes.FETCH_USER, loggedUser?.value?.id);

    const requestCourse = async (course: Course) => {
      if (loggedUser.value) {
        await store.dispatch(UserTypes.FETCH_USER, loggedUser.value.id);

        const data = {
          userId: loggedUser?.value?.id,
          course: course,
        };
        await store.dispatch(UserTypes.ADD_COURSE_USER, data);
      }
    };

    const deleteCourse = async (course: Course) => {
      await store.dispatch(CourseTypes.DELETE_COURSE, course);
      if (message?.value?.success) {
        closeMessage();
      }
    };

    const updateCourse = (id: string) => {
      router.push({ name: "UpdateCourseView", params: { id: `${id}` } });
    };

    const closeMessage = () =>
      store.dispatch(CourseTypes.CLOSE_COURSE_MESSAGE, message.value);

    return {
      courses,
      loading,
      isAdmin,
      message,
      loggedUser,
      fetchCourses,
      fetchUser,
      deleteCourse,
      updateCourse,
      requestCourse,
      closeMessage,
    };
  },
  mounted() {
    this.fetchCourses();
    if (this.loggedUser) {
      this.fetchUser();
    }
  },
});
</script>
<style scoped></style>
