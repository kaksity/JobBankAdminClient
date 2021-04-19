const routes = {
  path: '/profile',
  name: 'Profile',
  component: {
    template: '<router-view></router-view>',
  },
  meta: {
    hasMulSub: true,
    hidden: false,
    icon: 'developer_board',
  },
  children: [
    {
      path: 'completed',
      name: 'Completed',
      component: () => import('@/views/profile/Completed.vue'),
      meta: {
        icon: '',
      },
    },
    {
      path: 'uncompleted',
      name: 'Uncompleted',
      component: () => import('@/views/profile/Uncompleted.vue'),
      meta: {
        icon: '',
      },
    },
  ],
};

export default routes;
