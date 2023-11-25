<template>
  <table class="table table-striped">
    <thead>
      <tr>
        <th>Description</th>
        <th>Language</th>
        <th>Format</th>
        <th>Price</th>
        <th></th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="course in courses" :key="course.id">
        <td>{{ course.description }}</td>
        <td>{{ course.language }}</td>
        <td>{{ course.format }}</td>
        <td>{{ course.price }}</td>
        <slot :course="course"></slot>
        <td></td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Course } from "../models/Course";

export default defineComponent({
  name: "CoursesTable",
  props: {
    courses: {
      type: Array as PropType<Array<Course>>,
      required: true,
    },
  },
});
</script>

<style></style>
