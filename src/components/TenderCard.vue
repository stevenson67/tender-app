<template>
  <div class="tender-card">
    <h3>{{ tender.title }}</h3>
    <p>{{ tender.description }}</p>
    <router-link :to="{ name: 'TenderDetail', params: { id: tender.id } }">Подробнее</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
export default defineComponent ({
  name: "TenderCard",
  props: {
    tender: {
      type: Object as PropType<{ id: number; title: string; description: string }>,
      required: true,
    },
  },
});
</script>

<style scoped>

</style>