<template>
  <courses-table :courses="courses" v-slot="{ course }">
    <td>
      <button
        v-if="requested(course)"
        class="btn btn-outline-danger button-user"
        id="button-user"
        disabled
      >
        Requested
      </button>
      <button
        v-else
        class="btn btn-success btn-user"
        id="button-user"
        @click="request(course)"
      >
        Request
      </button>
    </td>
  </courses-table>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import CoursesTable from "../components/CoursesTable.vue";
import { Course } from "../models/Course";
import { useStore } from "../store";

export default defineComponent({
  name: "UserBoard",
  components: {
    CoursesTable,
  },
  props: {
    courses: {
      type: Array as PropType<Array<Course>>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const store = useStore();
    const user = computed(() => store.getters.getUser);

    const requested = (course: Course) =>
      user?.value?.courses?.some((e: Course) => e.id === course.id);
    const request = (course: Course) => emit("request", course);
    return {
      requested,
      request,
    };
  },
  emits: ["request"],
});
</script>

<style scoped>
button {
  margin-right: 1rem;
}

.btn-user {
  width: 100px;
}
</style>
