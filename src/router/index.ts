import { createRouter, createWebHistory } from 'vue-router';
import TenderList from '../pages/TenderList.vue';
import TenderDetail from '../pages/TenderDetail.vue';

const routes = [
  {
    path: '/',
    name: 'TenderList',
    component: TenderList
  },
  {
    path: '/tender/:id',
    name: 'TenderDetail',
    component: TenderDetail,
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
