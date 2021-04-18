<template>
  <v-container
    grid-list-lg
    pa-0
  >
    <v-layout wrap>
      <v-flex xs12>
        <v-basic-card
          title="List of profiles that are completed"
          toolbar-height="56"
        >
          <template slot="card-content">
            <v-data-table
              :headers="headers"
              :items="list"
              hide-actions
              class="elevation-1"
            >
              <template
                slot="items"
                slot-scope="props"
              >
                <td class="justify-center">
                  <v-icon
                    class="mr-2"
                  >
                    edit
                  </v-icon>
                  <v-icon disabled>delete</v-icon>
                </td>
              </template>
            </v-data-table>
          </template>
        </v-basic-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { deepCopy } from '@/utils/util';

export default {
  name: 'CompletedProfile',
  data() {
    return {
      headers: [
        {
          text: 'Full Name',
          align: 'left',
          sortable: false,
          value: 'full_name',
        },
        {
          text: 'Gender',
          value: 'gender',
          sortable: false,
        },
        {
          text: 'Phone Number',
          value: 'phone_number',
          sortable: false,
        },
        {
          text: 'Highest Qualification',
          value: 'highest_qualification',
          sortable: false,
        },
        {
          text: 'Local Government Area',
          value: 'lga',
          sortable: false,
        },
      ],
      list: [
      ],
    };
  },
  methods: {
    getListData() {
      this.$api
        .GetAllCompletedProfile(1,100)
        .then((val) => {
          const list = val.data.data || [];
          this.list = list.map((item) => {
            this.$set(item, 'edit', false);
            return item;
          });
        })
        .catch((res) => {
          console.error('getListData', res);
        });
    },
  },
  created() {
    this.getListData();
  },
};
</script>
