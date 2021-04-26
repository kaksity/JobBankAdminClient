<template>
  <div style="overflow-x: hidden;">
    <!-- <h2>Dashboard</h2> -->
    <v-layout
      justify-center
      align-center
      wrap
    >
      <v-flex
        lg3
        sm6
        xs12
        v-for="(config, index) in indicatorConfig"
        :key="index"
      >
        <v-card>
          <separate-indicator :config="config" />
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import {
  SeparateIndicator,
} from './components';

export default {
  name: 'Dashboard',
  components: {
    SeparateIndicator,
  },
  data() {
    return {
      chartOption: {},
      indicatorConfig: [
        {
          color: 'teal',
          title: 'COMPLETED PROFILE',
          count: 0,
        },
        {
          color: 'gray',
          title: 'UNCOMPLETED PROFILE',
          count: 0,
        },
        {
          color: 'cyan accent-3',
          title: 'LGA',
          count: 0,
        },
        {
          color: 'indigo',
          title: 'SKILL SET',
          count: 0,
        },
        {
          color: 'teal',
          title: 'FIRST CLASS',
          count: 0,
        },
        {
          color: 'light-blue',
          title: 'UPPER CREDIT',
          count: 0,
        },
        {
          color: 'cyan accent-3',
          title: 'LOWER CREDIT',
          count: 0,
        },
        {
          color: 'indigo',
          title: 'OTHERS GRADE',
          count: 0,
        },
      ],
    };
  },
  methods: {
    FillDashboardData() {
      this.$api.GetDashBoardData().then((res) => {
        const Grade = res.data.grade;
        const Profile = res.data.profile;

        this.indicatorConfig[0].count = Profile.completed_profile;
        this.indicatorConfig[1].count = Profile.uncompleted_profile;
        this.indicatorConfig[2].count = Profile.lga;
        this.indicatorConfig[3].count = Profile.skill_set;

        this.indicatorConfig[4].count = Grade.first_class;
        this.indicatorConfig[5].count = Grade.lower_credit;
        this.indicatorConfig[6].count = Grade.upper_credit;
        this.indicatorConfig[7].count = Grade.others;
      }).catch((err) => {
        this.$message({
          type: 'error',
          text: err.message,
        });
      });
    },
  },
  created() {
    this.FillDashboardData();
  },
};
</script>
