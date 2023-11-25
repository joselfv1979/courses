<!-- COMPONENTE QUE CREA EL FOOTER PARA LA APLICACIÓN-->
<template>
  <div class="container">
    <h6>Created by Jose {{ year }}</h6>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "FooterCustom",

  setup() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();

    return {
      year,
    };
  },
});
</script>

<style scoped>
.container {
  display: flex;
  height: 100%;
}

h6 {
  margin: auto;
  font-weight: bold;
  color: #2c3e50;
}
</style>
