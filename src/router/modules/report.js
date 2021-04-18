const routes = {
  path: '/reports',
  name: 'Reports',
  component: {
    template: '<router-view></router-view>',
  },
  meta: {
    hasMulSub: true,
    hidden: false,
    icon: 'widgets',
  },
  children: [
    {
      path: 'icons',
      name: 'Com',
      component: () => import('@/views/widgets/svg-icon/VIcons.vue'),
      meta: {},
    },
    {
      path: 'icons',
      name: 'Icons',
      component: () => import('@/views/widgets/svg-icon/VIcons.vue'),
      meta: {},
    },
  ],
};

export default routes;
