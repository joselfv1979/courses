<template>
  <div class="container">
    <h1>Instructor Application</h1>
    <div class="course-title">
      <h3>Course</h3>
    </div>
    <!-- <message-component
      v-if="message"
      :message="message"
      :hasSuccess="hasSuccess"
      @close="message = ''"
    /> -->
    <form>
      <fieldset class="form-group">
        <label>Description</label>
        <input
          type="text"
          id="description"
          class="form-control"
          v-model="course.description"
          v-focus
        />
      </fieldset>
      <fieldset class="form-group">
        <label>Language</label>
        <input type="text" class="form-control" v-model="course.language" />
      </fieldset>
      <div class="form-group">
        <label for="type">Format</label>
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            v-model="course.format"
            name="format"
            id="in-person"
            value="in-person"
          />
          <label class="form-check-label" for="inPerson">In-person</label>
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            v-model="course.format"
            name="format"
            id="online"
            value="online"
          />
          <label class="form-check-label" for="online">Online</label>
        </div>
      </div>
      <fieldset class="form-group">
        <label>Price</label>
        <input type="text" class="form-control" v-model="course.price" />
      </fieldset>
    </form>
    <button class="btn btn-success" @click="validate">Save</button>
    <button class="btn btn-warning" @click="back">Back</button>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, ComputedRef } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { Course, initialCourse } from "../models/Course";

export default defineComponent({
  name: "CoursesForm",
  props: {
    editing: Boolean,
  },
  setup(props, { emit }) {
    const store = useStore();
    const router = useRouter();

    const auxCourse: ComputedRef<Course> = computed(
      () => store.getters.getCourse
    );
    const course = computed(() =>
      props.editing ? auxCourse.value : initialCourse
    );
    const back = () => router.push({ name: "HomeView" });

    const validate = () => emit("submitValidate", course.value);

    return {
      course,
      back,
      validate,
    };
  },
  emits: ["submitValidate"],
});
</script>
<style scoped>
.course-title {
  display: flex;
}
fieldset,
label {
  margin-bottom: 1rem;
}

button {
  margin-right: 1rem;
  margin-bottom: 1rem;
}
</style>
