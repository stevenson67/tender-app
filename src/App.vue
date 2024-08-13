<template>
  <div id="app">
    <header>
      <h1>Tender List</h1>
    </header>

    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
});
</script>

<style lang="scss">
h3, p {
  margin: 0;
}
</style>