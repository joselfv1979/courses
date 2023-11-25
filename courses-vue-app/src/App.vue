<!-- COMPONENTE PRINCIPAL DE LA APLICACIÓN -->
<template>
  <div id="app">
    <header>
      <menucustom />
    </header>
    <main>
      <router-view />
    </main>
    <footer>
      <footercustom />
    </footer>
  </div>
</template>

<script lang="ts">
import menucustom from "./components/MenuCustom.vue";
import footercustom from "./components/FooterCustom.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  components: {
    menucustom,
    footercustom,
  },
});
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
}

header {
  height: 15vh;
}

main {
  min-height: 75vh;
  display: flex;
}

footer {
  height: 10vh;
}
</style>
