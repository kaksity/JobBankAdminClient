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
        <v-basic-card title="Generate Excel Report Based on Profile">
          <template slot="card-content">
            <v-layout>
              <v-flex>
                <v-container fluid>
                  <v-layout row wrap>
                    <v-flex>
                      <v-checkbox
                        v-model="IsGender"
                        label="Gender"
                      />
                    </v-flex>
                    <v-flex
                      mr-0
                      v-if="IsGender"
                    >
                      <v-select
                        label="Gender"
                        v-model="Gender"
                        :items="GenderList"
                        item-text="text"
                        item-value="name"
                      />
                    </v-flex>
                  </v-layout>
                </v-container>
                <v-container fluid>
                  <v-layout row wrap>
                    <v-flex>
                      <v-checkbox
                        label="Employment Status"
                        v-model="IsEmploymentStatus"
                      />
                    </v-flex>
                    <v-flex
                      mr-0
                      v-if="IsEmploymentStatus"
                    >
                      <v-select
                        v-model="EmploymentStatus"
                        label="Employment Status"
                        :items="EmploymentStatusList"
                        item-text="text"
                        item-value="name"
                      />
                    </v-flex>
                  </v-layout>
                </v-container>
                <v-container fluid>
                  <v-layout row wrap>
                    <v-flex>
                      <v-checkbox
                        label="Marital Status"
                        v-model="IsMaritalStatus"
                      />
                    </v-flex>
                    <v-flex
                      mr-0
                      v-if="IsMaritalStatus"
                    >
                      <v-select
                        label="Marital Status"
                        v-model="MaritalStatus"
                        :items="MaritalStatusList"
                        item-text="text"
                        item-value="name"
                      />
                    </v-flex>
                  </v-layout>
                </v-container>
                <v-container fluid>
                  <v-layout row wrap>
                    <v-flex>
                      <v-checkbox
                        label="Highest Qualification"
                        v-model="IsHighestQualification"
                      />
                    </v-flex>
                    <v-flex
                      mr-0
                    >
                      <v-select
                        v-if="IsHighestQualification"
                        v-model="HighestEducationLevel"
                        label="Highest Qualification"
                        :items="HighestQualificationList"
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
                        label="Local Goverment Area"
                        v-model="IsLocalGovermentArea"
                      />
                    </v-flex>
                    <v-flex
                      mr-0
                      v-if="IsLocalGovermentArea"
                    >
                      <v-select
                        label="Local Goverment Area"
                        :items="LGAList"
                        v-model="LocalGovernmentArea"
                        item-text="name"
                        item-value="id"
                      />
                    </v-flex>
                  </v-layout>
                </v-container>
                <v-container  fluid>
                  <v-layout row wrap>
                    <v-flex>
                      <v-checkbox
                        label="Educated Status"
                        v-model="IsEducatedStatus"
                      />
                    </v-flex>
                    <v-flex
                      ml-0
                      v-if="IsEducatedStatus"
                    >
                      <v-select
                        label="Educated Status"
                        :items="EducatedStatusList"
                        v-model="EducatedStatus"
                        item-text="name"
                        item-value="id"
                      />
                    </v-flex>
                  </v-layout>
                </v-container>
                <v-container fluid>
                  <v-layout row wrap>
                    <v-flex
                      xs12
                      sm12
                      block
                    >
                      <v-btn color="primary" @click="GenerateReport">Generate Report</v-btn>
                    </v-flex>
                    <v-flex
                      xs12
                      sm12
                      block
                      v-if="IsDownloaded"
                    >
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
      IsGender: false,
      IsEmploymentStatus: false,
      IsMaritalStatus: false,
      IsHighestQualification: false,
      IsLocalGovermentArea: false,
      IsEducatedStatus: false,
      IsDownloaded: false,

      Gender: '',
      EmploymentStatus: '',
      MaritalStatus: '',
      HighestEducationLevel: '',
      LocalGovernmentArea: '',
      EducatedStatus: '',
      ReportURL: '',

      LGAListList: [],
      EducatedStatusList: [{id: "true", name: "Yes"},{id:"false", name:"No"}],
      HighestQualificationList: [],
      GenderList: [{ name: 'MALE', text: 'Male' }, { name: 'FEMALE', text: 'Female' }],
      MaritalStatusList: [{ name: 'SINGLE', text: 'Single' }, { name: 'MARRIED', text: 'Married' }, { name: 'WIDOWED', text: 'Widowed' }, { name: 'DIVORCED', text: 'Divorced' }],
      EmploymentStatusList: [{ name: 'UNEMPLOYED', text: 'Unemployed' }, { name: 'EMPLOYED FULL TIME', text: 'Employed Full Time' }, { name: 'EMPLOYED PART TIME', text: 'Employed Part Time' }, { name: 'ENTREPRENUER', text: 'Entreprenuer' }, { name: 'STARTUP FOUNDER', text: 'Startup Founder' }, { name: 'SELF EMPLOYED', text: 'Self Employed' }, { name: 'STUDENT', text: 'Student' }],
    };
  },
  methods: {
    FillLGASelect() {
      this.$api.GetLGA().then((res) => {
        this.LGAList = res.data;
      }).catch((err) => {
        this.$message({
          type: 'error',
          text: err.message
        });
      });
    },
    FillHighestQualificationSelect() {
      this.$api.GetHighestQualification().then((res) => {
        this.HighestQualificationList = res.data;
      }).catch((err) => {
        this.$message({
          type: 'error',
          text: err.message
        });
      });
    },
    GenerateReport(){
      let UrlQueryParameters = '?';

      if(this.IsGender === true){
        if (this.Gender === '') {
          this.$message({
            type: 'error',
            text: 'Gender is required'
          });
          return;
        }
        UrlQueryParameters += `gender=${this.Gender}&`;
      }

      if(this.IsEmploymentStatus === true){
        if (this.EmploymentStatus === '') {
          this.$message({
            type: 'error',
            text: 'Employment Status is required'
          });
          return;
        }
        UrlQueryParameters += `employment=${this.EmploymentStatus}&`;
      }

      if(this.IsMaritalStatus === true){
        if (this.MaritalStatus === '') {
          this.$message({
            type: 'error',
            text: 'Marital Status is required'
          });
          return;
        }
        UrlQueryParameters += `marital=${this.MaritalStatus}&`;
      }
      if(this.IsHighestQualification === true){
        if (this.HighestEducationLevel === '') {
          this.$message({
            type: 'error',
            text: 'Highest Qualification is required'
          });
          return;
        }
        UrlQueryParameters += `qualification=${this.HighestEducationLevel}&`;
      }
      if(this.IsLocalGovermentArea === true){
        if (this.LocalGovernmentArea === '') {
          this.$message({
            type: 'error',
            text: 'Local Government Area is required'
          });
          return;
        }
        UrlQueryParameters += `lga=${this.LocalGovernmentArea}&`;
      }
      if(this.IsEducatedStatus === true){
        if (this.EducatedStatus === '') {
          this.$message({
            type: 'error',
            text: 'Educated Status is required'
          });
          return;
        }
        UrlQueryParameters += `educated=${this.EducatedStatus}&`;
        console.log(UrlQueryParameters);
      }

      this.IsDownloaded = false;
      this.ReportURL = '';

      this.$api.GenerateProfileExcelReport(UrlQueryParameters).then((res) => {

        this.IsDownloaded = true;
        this.ReportURL = res.url;

        this.$message({
          type: 'success',
          text: res.message
        });

      }).catch((err) => {
        this.$message({
          type: 'error',
          text: err.message
        });
      });
    },
    DownloadReport() {
      window.open(this.ReportURL);
    },
  },
  created() {
    this.FillLGASelect();
    this.FillHighestQualificationSelect();
  }
}
</script>
