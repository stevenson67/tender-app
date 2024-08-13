<template>
  <div>
    <form @submit.prevent="handleSearch">
      <input v-model="searchQuery" type="text" placeholder="Search" />
      <button type="submit">Search</button>
    </form>

    <transition-group name="fade" tag="div" class="tender-list">
      <div v-for="tender in filteredTenders" :key="tender.id" class="tender-card">
        <h3>{{ tender.title }}</h3>
        <p>{{ truncateDescription(tender.description, 30) }}</p>
        <p>Category: {{ tender.category }}</p>
        <p>Place: {{ tender.place }}</p>
        <router-link :to="{ name: 'TenderDetail', params: { id: tender.id } }">
          View Details
        </router-link>
      </div>
    </transition-group>

    <TenderPaginator
        :currentPage="currentPage"
        :totalPages="totalPages"
        @updatePage="handlePageChange"
    />
  </div>
</template>

<script lang="ts">
import { ref, onMounted, computed } from 'vue';
import TenderPaginator from '../components/TenderPaginator.vue';

interface Tender {
  id: string;
  title: string;
  description: string;
  category: string;
  place: string;
}

export default {
  name: "TenderList",
  components: { TenderPaginator },
  setup() {
    const tenders = ref<Tender[]>([]);
    const currentPage = ref(1);
    const totalPages = ref(1);
    const searchQuery = ref('');

    const fetchTenders = async (page = 1) => {
      try {
        const response = await fetch(`https://api.test-webest.ru/list/?page=${page}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        tenders.value = data.data;
        currentPage.value = data.page_number;
        totalPages.value = data.page_count;
        scrollToTop();
      } catch (error) {
        console.error("Failed to fetch tenders:", error);
        alert("Failed to fetch tenders. Please try again later.");
      }
    };

    const truncateDescription = (description: string | null | undefined, maxLength: number) => {
      if (!description) {
        return '';
      }
      if (description.length <= maxLength) {
        return description;
      }
      return description.substring(0, maxLength) + '...';
    };

    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    };

    const handleSearch = () => {
      currentPage.value = 1;
      fetchTenders(currentPage.value);
    };

    const filteredTenders = computed(() => {
      return tenders.value.filter(tender =>
          tender.title.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    });

    const handlePageChange = (newPage: number) => {
      currentPage.value = newPage;
      fetchTenders(currentPage.value);
    };

    onMounted(() => {
      fetchTenders(currentPage.value);
    });

    return {
      tenders,
      currentPage,
      totalPages,
      searchQuery,
      filteredTenders,
      fetchTenders,
      truncateDescription,
      handleSearch,
      handlePageChange,
    };
  }
};
</script>

<style lang="scss">
.loading-spinner {
  text-align: center;
  margin-top: 20px;
}

.tender-list {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 24px;
  margin: 48px 0;
}
.tender-card {
  display: flex;
  flex-direction: column;
  gap: 16px;
  border: 1px solid #0003;
  padding: 16px 24px;
  border-radius: 8px;
  a {
    margin-top: auto;
  }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>