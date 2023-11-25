<template>
  <courses-table :courses="courses" v-slot="{ course }">
    <td>
      <slot :course="course"></slot>
      <button class="btn btn-success" @click="update(course)">
        <pencil-icon />
      </button>
      <button class="btn btn-danger" @click="remove(course)">
        <trash-icon />
      </button>
    </td>
  </courses-table>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import CoursesTable from "../components/CoursesTable.vue";
import PencilIcon from "../components/PencilIcon.vue";
import TrashIcon from "../components/TrashIcon.vue";
import { Course } from "../models/Course";

export default defineComponent({
  name: "AdminBoard",
  components: {
    CoursesTable,
    PencilIcon,
    TrashIcon,
  },
  props: {
    courses: {
      type: Array as PropType<Array<Course>>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const update = (course: Course) => emit("update", course.id);
    const remove = (course: Course) => emit("remove", course);

    return {
      update,
      remove,
    };
  },
  emits: ["update", "remove"],
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
