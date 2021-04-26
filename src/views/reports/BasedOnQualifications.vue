<template>
  <v-container
    grid-list-lg
    pa-0
  >
    <v-layout wrap>
      <!-- Base -->
      <v-flex
        xs12
        sm12

      >
        <v-basic-card title="Generate Excel Report Based on Qualifications">
          <template slot="card-content">
            <v-layout>
              <v-flex>
                <v-container fluid>
                  <v-layout row wrap>
                    <v-flex>
                      <v-checkbox
                        v-model="IsCompleted"
                        label="Completed"
                      />
                    </v-flex>
                    <v-flex
                      mr-0
                      v-if="IsCompleted"
                    >
                      <v-select
                        label="Completed"
                        v-model="Completed"
                        :items="CompletedStatusList"
                        item-text="name"
                        item-value="id"
                      />
                    </v-flex>
                  </v-layout>
                </v-container>
                <v-container fluid>
                  <v-layout row wrap>
                    <v-flex>
                      <v-checkbox
                        label="Course Name"
                        v-model="IsCourseName"
                      />
                    </v-flex>
                    <v-flex
                      mr-0
                      v-if="IsCourseName"
                    >
                      <v-text-field
                        v-model="CourseName"
                        label="Course Name"
                      />
                    </v-flex>
                  </v-layout>
                </v-container>
                <v-container fluid>
                  <v-layout row wrap>
                    <v-flex>
                      <v-checkbox
                        label="Grade"
                        v-model="IsGrade"
                      />
                    </v-flex>
                    <v-flex
                      mr-0
                      v-if="IsGrade"
                    >
                      <v-select
                        label="Grade"
                        v-model="Grade"
                        :items="GradeList"
                        item-text="text"
                        item-value="value"
                      />
                    </v-flex>
                  </v-layout>
                </v-container>
                <v-container fluid>
                  <v-layout row wrap>
                    <v-flex>
                      <v-checkbox
                        label="Qualification"
                        v-model="IsQualification"
                      />
                    </v-flex>
                    <v-flex
                      mr-0
                    >
                      <v-select
                        v-if="IsQualification"
                        v-model="Qualification"
                        label="Qualification"
                        :items="QualificationList"
                        item-text="name"
                        item-value="id"
                      />
                    </v-flex>
                  </v-layout>
                </v-container>
                <v-container fluid>
                  <v-layout row wrap>
                    <v-flex>
                      <v-btn color="primary" @click="GenerateReport">Generate Report</v-btn>
                    </v-flex>
                    <v-flex v-if="IsDownloaded">
                      <v-btn color="secondary" @click="DownloadReport">Download Report</v-btn>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-flex>
            </v-layout>
          </template>
        </v-basic-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>

export default {
  data() {
    return {
      IsCompleted: false,
      IsQualification: false,
      IsGrade: false,
      IsCourseName: false,

      Completed: '',
      Qualification: '',
      Grade: '',
      CourseName: '',
      IsDownloaded: false,
      ReportURL: '',

      CompletedStatusList: [{ id: 'YES', name: 'Yes' }, { id: 'NO', name: 'No' }],
      QualificationList: [],
      GradeList: [{ text: 'First Class', value: 'FIRST CLASS' }, { text: 'Upper Credit', value: 'UPPER CREDIT' }, { text: 'Lower Credit', value: 'LOWER CREDIT' }, { text: 'Credit', value: 'CREDIT' }, { text: 'Pass', value: 'PASS' }, { text: 'Second Class Upper', value: 'SECOND CLASS UPPER' }, { text: 'Second Class Lower', value: 'SECOND CLASS LOWER' }],
    };
  },
  methods: {
    FillHighestQualificationSelect() {
      this.$api.GetHighestQualification().then((res) => {
        this.QualificationList = res.data;
      }).catch((err) => {
        this.$message({
          type: 'error',
          text: err.message,
        });
      });
    },
    GenerateReport() {
      let UrlQueryParameters = '?';

      if (this.IsCompleted === true) {
        if (this.Completed === '') {
          this.$message({
            type: 'error',
            text: 'Completed Status is required',
          });
          return;
        }
        UrlQueryParameters += `completed=${this.Completed}&`;
      }

      if (this.IsCourseName === true) {
        if (this.CourseName === '') {
          this.$message({
            type: 'error',
            text: 'Course Name is required',
          });
          return;
        }
        UrlQueryParameters += `course=${this.CourseName}&`;
      }

      if (this.IsGrade === true) {
        if (this.Grade === '') {
          this.$message({
            type: 'error',
            text: 'Grade is required',
          });
          return;
        }
        UrlQueryParameters += `grade=${this.Grade}&`;
      }
      if (this.IsQualification === true) {
        if (this.Qualification === '') {
          this.$message({
            type: 'error',
            text: 'Qualification is required',
          });
          return;
        }
        UrlQueryParameters += `qualification=${this.Qualification}&`;
      }

      this.IsDownloaded = false;
      this.ReportURL = '';

      this.$api.GenerateQualificationExcelReport(UrlQueryParameters).then((res) => {
        this.IsDownloaded = true;
        this.ReportURL = res.url;

        this.$message({
          type: 'success',
          text: res.message,
        });
      }).catch((err) => {
        this.$message({
          type: 'error',
          text: err.message,
        });
      });
    },
    DownloadReport() {
      window.open(this.ReportURL);
    },
  },
  created() {
    this.FillHighestQualificationSelect();
  },
};
</script>
