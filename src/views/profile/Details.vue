<template>
  <v-container
    grid-list-lg
    pa-0
  >
    <v-layout wrap>
      <div><h2>Personal Information</h2></div>
      <v-container fluid>
        <v-layout row wrap>
          <v-flex
            xs12
            sm12
            md4
            lg3
          >
            <b>First Name</b>
            <div>{{ProfileDetails.first_name}}</div>
          </v-flex>
          <v-flex
            xs12
            sm12
            md4
            lg3
          >
            <b>Middle Name</b>
            <div>{{ProfileDetails.middle_name}}</div>
          </v-flex>
          <v-flex
            sm12
            xs12
            md4
            lg3
          >
            <b>Last Name</b>
            <div>{{ProfileDetails.last_name}}</div>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex
            xs12
            sm12
            md4
            lg3
          >
            <b>Date Of Birth</b>
            <div>{{ProfileDetails.dob}}</div>
          </v-flex>
          <v-flex
            xs12
            sm12
            md4
            lg3
          >
            <b>Gender</b>
            <div>{{ProfileDetails.gender}}</div>
          </v-flex>
          <v-flex
            xs12
            sm12
            md4
            lg3
          >
            <b>Local Government Area</b>
            <div>{{ProfileDetails.lga}}</div>
          </v-flex>
          <v-flex
            xs12
            sm12
            md4
            lg3
          >
            <b>Marital Status</b>
            <div>{{ProfileDetails.marital_status}}</div>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex
            xs12
            sm12
            md4
            lg3
          >
            <b>Employment Status</b>
            <div>{{ProfileDetails.employment_status}}</div>
          </v-flex>
          <v-flex
            xs12
            sm12
            md4
            lg3
          >
            <b>Highest Education Level</b>
            <div>{{ProfileDetails.highest_education_level}}</div>
          </v-flex>
          <v-flex
            xs12
            sm12
            md4
            lg3
          >
            <b>Phone Number</b>
            <div>{{ProfileDetails.phone_number}}</div>
          </v-flex>
          <v-flex
            xs12
            sm12
            md4
            lg3
          >
            <b>Additional Info</b>
            <div>{{ProfileDetails.additional_info}}</div>
          </v-flex>
        </v-layout>
      </v-container>
      <div><h2>Qualification Information</h2></div>
      <v-container fluid>
        <v-layout row wrap>
          <v-flex
            xs12
            sm6
            md3
            lg4
            v-for="q in Qualifications"
          >
            <div>
              <b>School Name</b>
              <div>{{q.school_name}}</div>
            </div>
            <div>
              <b>Qualification</b>
              <div>{{q.qualifications}}</div>
            </div>
            <div>
              <b>Grade</b>
              <div>{{q.grade}}</div>
            </div>
            <div>
              <b>Admission Date</b>
              <div>{{q.admission_date}}</div>
            </div>
            <div>
              <b>Graduation Date</b>
              <div>{{q.graduation_date}}</div>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
      <div><h2>Work Experience</h2></div>
      <v-container fluid>
        <v-layout row wrap>
          <v-flex
            xs12
            sm6
            md3
            lg4
            v-for="w in WorkExperiences"
          >
            <div>
              <b>Employer Name</b>
              <div>{{w.employer}}</div>
            </div>
            <div>
              <b>Job Title</b>
              <div>{{w.job_title}}</div>
            </div>
            <div>
              <b>Start Date</b>
              <div>{{w.start_date}}</div>
            </div>
            <div>
              <b>Stop Date</b>
              <div>{{w.stop_date}}</div>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
      <div><h2>Skill Sets</h2></div>
      <v-container fluid>
        <v-layout row wrap>
          <v-flex
            xs12
            sm6
            md3
            lg4
            v-for="s in SkillSets"
          >
            <div>
              <b>Skill</b>
              <div>{{s.name}}</div>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
      <v-container>
        <v-layout>
          <v-flex sm4 md4 lg4>
            <v-btn block color="primary" @click="GenerateCV">Generate CV</v-btn>
          </v-flex>
          <v-flex sm4 md4 lg4 v-if="CVGenerated" @click="DownloadCV">
            <v-btn block color="secondary">Download CV</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-layout>
  </v-container>
</template>

<script>

export default {
  name: 'DetailsProfile',
  data() {
    return {
      ProfileID: '',
      ProfileDetails: {},
      Qualifications: [],
      WorkExperiences: [],
      SkillSets: [],
      CVGenerated: false,
      CVDownloadURL: '',
    };
  },
  methods: {
    GenerateCV() {
      this.CVGenerated = false;
      this.CVDownloadURL = '';

      this.$api.GenerateCV(this.ProfileID).then((res) => {
        this.$message({
          type: 'success',
          text: res.message,
        });
        this.CVGenerated = true;
        this.CVDownloadURL = res.url;
      }).catch((err) => {
        this.$message({
          type: 'error',
          text: err.message,
        });
      });
    },
    DownloadCV() {
      window.open(this.CVDownloadURL);
    },
    GetProfileDetails() {
      console.log(this.ProfileID);
      this.$api.GetProfileDetails(this.ProfileID).then((res) => {
        this.ProfileDetails = res.data.profile;
        this.Qualifications = res.data.qualifications;
        this.WorkExperiences = res.data.work_experience;
        this.SkillSets = res.data.skill_set;
      }).catch((err) => {
        this.$message({
          type: 'error',
          text: err.message,
        });
      });
    },
  },
  created() {
    this.ProfileID = this.$route.params.id;
    this.GetProfileDetails();
  },
};
</script>
