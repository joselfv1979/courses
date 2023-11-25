<!-- SPINNER QUE SE MUESTRA AL CARGAR DATOS -->
<template>
  <div class="loading"></div>
</template>

<script lang="ts">
export default {
  name: "LoadingComponent",
};
</script>

<style scoped>
.loading {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 50px;
  height: 50px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: black;
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to {
    -webkit-transform: rotate(360deg);
  }
}
@-webkit-keyframes spin {
  to {
    -webkit-transform: rotate(360deg);
  }
}
</style>
