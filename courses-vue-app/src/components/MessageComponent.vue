<!-- MENSAJE DE ÉXITO O ERROR -->
<template>
  <div :class="[message?.success ? successClass : errorClass]">
    <button class="btn-close" data-bs-dismiss="alert" @click="close"></button>
    {{ message?.text }}
  </div>
</template>

<script lang="ts">
import { Message } from "../models/Message";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "MessageComponent",
  props: {
    message: {
      type: Object as PropType<Message>,
      default: undefined,
    },
  },
  setup(props, { emit }) {
    const close = () => emit("close");

    return {
      close,
      successClass: "alert alert-success alert-dismissible",
      errorClass: "alert alert-danger alert-dismissible",
    };
  },
  emits: ["close"],
});
</script>

<style></style>
