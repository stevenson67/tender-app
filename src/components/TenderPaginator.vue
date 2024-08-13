<template>
  <div class="paginator">
    <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1">Назад</button>
    <span>Страница {{ currentPage }} из {{ totalPages }}</span>
    <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages">Вперед</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent ({
  name: "TenderPaginator",
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
  },
  emits: ['updatePage'],
  methods: {
    changePage(page: number) {
      this.$emit('updatePage', page);
    },
  },
});
</script>

<style lang="scss">
.paginator {
  display: flex;
  justify-content: center;
  gap: 12px;
}
</style>