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
      path: 'based-on-profile',
      name: 'Profile',
      component: () => import('@/views/reports/BasedOnProfile.vue'),
      meta: {},
    },
    {
      path: 'based-on-qualifications',
      name: 'Qualification',
      component: () => import('@/views/reports/BasedOnQualifications.vue'),
      meta: {},
    },
    {
      path: 'based-on-skills',
      name: 'Skill Set',
      component: () => import('@/views/reports/BasedOnSkillSets.vue'),
      meta: {},
    },
  ],
};

export default routes;
