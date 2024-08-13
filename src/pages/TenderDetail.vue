<template>
  <transition name="fade">
    <div v-if="tender">
      <h1>{{ tender.title }}</h1>
      <p>{{ tender.description }}</p>
      <p>Category: {{ tender.category }}</p>
      <p>Place: {{ tender.place }}</p>
      <button @click="goBack">Back</button>
    </div>
  </transition>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

interface Tender {
  id: string;
  date: string;
  deadline_date: string;
  title: string;
  category: string;
  description: string;
  phase: string;
  place: string;
  sid: string;
  eid: string;
  awarded_value: string;
  awarded_currency: string;
  awarded_value_eur: string;
  purchaser: {
    id: number;
    sid: number;
    name: string;
    type: {
      id: string;
      name: string;
      slug: string;
    };
  };
  awarded: {
    date: string;
    suppliers_id: number;
    value: number;
    count: number;
    suppliers_name: string;
    suppliers: Array<{
      name: string;
      id: number;
      slug: string;
      value_for_one: number;
      value_for_one_eur: number;
      value_for_two: number;
      value_for_two_eur: number;
      value_for_three: number;
      value_for_three_eur: number;
    }>;
    value_eur: number;
  }[];
}

export default {
  name: "TenderDetail",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const tender = ref<Tender | null>(null);

    const fetchTender = async (id: string) => {
      try {
        const response = await fetch(`https://api.test-webest.ru/element/?id=${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        tender.value = await response.json();
      } catch (error) {
        console.error("Failed to fetch tender:", error);
        alert("Failed to fetch tender details. Please try again later.");
      }
    };

    const goBack = () => {
      router.push({ name: 'TenderList' });
    };

    onMounted(() => {
      const { id } = route.params;
      fetchTender(id as string);
    });

    return {
      tender,
      goBack
    };
  }
};
</script>

<style lang="scss">
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>