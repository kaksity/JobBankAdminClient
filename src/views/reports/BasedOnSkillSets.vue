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
                        v-model="IsSkilled"
                        label="Skill Set"
                      />
                    </v-flex>
                    <v-flex
                      mr-0
                      v-if="IsSkilled"
                    >
                      <v-select
                        label="Skills"
                        v-model="Skill"
                        :items="SkillSetList"
                        item-text="name"
                        item-value="id"
                        @change="changeSkill"
                      />
                      <div v-if="IsOtherSkill">
                        <v-text-field
                          label="Skill Set Name"
                          v-model="OtherSkill"
                        />
                      </div>
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
      IsSkilled: false,
      IsOtherSkill: false,

      Skill: '',
      OtherSkill: '',

      IsDownloaded: false,
      ReportURL: '',

      SkillSetList: [],
      CompletedStatusList: [{id: "YES", name: "Yes"},{id:"NO", name:"No"}],
      QualificationList: [],
      GradeList: [{ text: 'First Class', value: 'FIRST CLASS' }, { text: 'Upper Credit', value: 'UPPER CREDIT' }, { text: 'Lower Credit', value: 'LOWER CREDIT' }, { text: 'Credit', value: 'CREDIT' }, { text: 'Pass', value: 'PASS' }, { text: 'Second Class Upper', value: 'SECOND CLASS UPPER' }, { text: 'Second Class Lower', value: 'SECOND CLASS LOWER' }],
    };
  },
  methods: {
    changeSkill (i) {
      if (i !== '19') {
        this.IsOtherSkill = false
      } else {
        this.IsOtherSkill = true
      }
    },
    FillSkillSetSelect() {
      this.$api.GetSkillSet().then((res) => {
        this.SkillSetList = res.data;
      }).catch((err) => {
        this.$message({
          type: 'error',
          text: err.message
        });
      });
    },
    GenerateReport(){
      let UrlQueryParameters = '?';

      if(this.IsSkilled === true){
        if (this.Skill === '') {
          this.$message({
            type: 'error',
            text: 'Skill is required is required'
          });
          return;
        }
        if(this.Skill === '19' && this.OtherSkill === ''){
          this.$message({
            type: 'error',
            text: 'Specify Other Skills'
          });
          return;
        }

        (this.Skill === '19') ? UrlQueryParameters += `id=${this.Skill}&name=${this.OtherSkill}`: UrlQueryParameters += `id=${this.Skill}` ;

      }

      this.IsDownloaded = false;
      this.ReportURL = '';

      this.$api.GenerateSkillSetExcelReport(UrlQueryParameters).then((res) => {

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
    this.FillSkillSetSelect();
  }
}
</script>
