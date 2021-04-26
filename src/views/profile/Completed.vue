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
                <td>{{ props.item.full_name }}</td>
                <td>{{ props.item.gender }}</td>
                <td>{{ props.item.phone_number }}</td>
                <td>{{ props.item.highest_qualification }}</td>
                <td>{{ props.item.lga }}</td>
                <td class="justify-center">
                  <v-icon
                    class="mr-2"
                    @click="ViewDetails(props.item.id)"
                  >
                    camera
                  </v-icon>
                </td>
              </template>
            </v-data-table>
            <v-pagination
              v-model="CurrentPage"
              :length="TotalNumberOfPages"
              :value="CurrentPage"
              @input="GoToPage"
              @next="NextPage"
              @previous="PreviousPage"
            />
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
      CurrentPage: 1,
      TotalNumberOfPages: 0,
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
        {
          text: 'Action',
          sortable: false,
        },
      ],
      list: [
      ],
    };
  },
  methods: {
    getListData(CurrentPage) {
      this.$api
        .GetAllCompletedProfile(CurrentPage, 1000)
        .then((val) => {
          this.TotalNumberOfPages = val.links.total_number_pages;
          const list = val.data || [];
          this.list = list.map((item) => {
            this.$set(item, 'edit', false);
            return item;
          });
        })
        .catch((res) => {
          this.$message({
            text: res.data.message,
            type: 'error',
          });
        });
    },
    ViewDetails(id) {
      this.$router.push({ path: `/profile/details/${id}` });
    },
    NextPage() {
      this.CurrentPage = this.CurrentPage + 1;
      this.getListData(this.CurrentPage);
    },
    PreviousPage() {
      this.CurrentPage = this.CurrentPage - 1;
      if (this.CurrentPage < 0) {
        this.CurrentPage = 1;
      }
      this.getListData(this.CurrentPage);
    },
    GoToPage() {
      this.getListData(this.CurrentPage);
    },
  },
  created() {
    this.getListData(this.CurrentPage);
  },
};
</script>
