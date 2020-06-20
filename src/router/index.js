/* eslint-disable global-require */
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [

  {
    path: '/',
    name: 'homepage',
    // eslint-disable-next-line import/no-dynamic-require
    component: (resolve) => require(['../views/Home'], resolve),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
