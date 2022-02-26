import { defineConfig } from 'umi';

export default defineConfig({
  crossorigin: true,
  nodeModulesTransform: {
    type: 'none',
  },
  analytics: {
    ga: 'UA-162324616-1',
  },

  404: true,
  routes: [
    {
      path: '/main',
      component: '@/layouts/Skelton',
      wrappers: ['@/pages/firebasewrapper', '@/pages/authwrapper'],
      routes: [
        {
          path: '/main/works',
          component: 'works',
        },
        { path: '/main', component: 'user' },
        { path: '/main/generalterms', component: 'generalterms' },
        { path: '/main/floormap', component: 'floormap' },
        { path: '/main/menus', component: 'menus' },
      ],
    },

    {
      path: '/login',
      component: '@/pages/login',
      wrappers: ['@/pages/firebasewrapper'],
    },
    { component: '@/pages/404.tsx' },
  ],
  fastRefresh: {},
});
