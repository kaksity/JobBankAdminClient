<template>
  <v-container
    grid-list-lg
    pa-0
  >
    <v-layout wrap>
      <v-flex
        xs12
        lg12
      >
        <v-basic-card
          title="Change User Password"
          toolbar-height="56"
        >
          <template slot="card-content">
            <v-form @submit.prevent="ChangePassword">
              <v-container fluid>
                <v-layout wrap row>
                  <v-flex
                    xs12
                    sm12
                    md12
                    lg12
                  >
                    <v-text-field
                      v-model="OldPassword"
                      label="Old Password"
                      prepend-icon="lock"
                      @keyup.enter.native="login"
                      :append-icon="showPwd ? 'visibility_off' : 'visibility'"
                      :type="showPwd ? 'text' : 'password'"
                      @click:append="showPwd = !showPwd"
                    />
                  </v-flex>
                </v-layout>
                <v-layout wrap row>
                  <v-flex
                    xs12
                    sm12
                    md12
                    lg12
                  >
                    <v-text-field
                      v-model="NewPassword"
                      label="New Password"
                      prepend-icon="lock"
                      @keyup.enter.native="login"
                      :append-icon="showPwd ? 'visibility_off' : 'visibility'"
                      :type="showPwd ? 'text' : 'password'"
                      @click:append="showPwd = !showPwd"
                    />
                  </v-flex>
                </v-layout>
                <v-layout wrap row>
                  <v-flex
                    xs12
                    sm12
                    md12
                    lg12
                  >
                    <v-text-field
                      v-model="ConfirmNewPassword"
                      label="Confirm New Password"
                      prepend-icon="lock"
                      @keyup.enter.native="login"
                      :append-icon="showPwd ? 'visibility_off' : 'visibility'"
                      :type="showPwd ? 'text' : 'password'"
                      @click:append="showPwd = !showPwd"
                    />
                  </v-flex>
                </v-layout>

                <v-layout wrap row>
                  <v-flex>
                    <v-btn
                      color="primary"
                      class="mr-0"
                      type="submit"
                    >
                      Change Password
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-form>
          </template>
        </v-basic-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'ChangePassword',
  data() {
    return {
      showPwd: false,
      OldPassword: '',
      NewPassword: '',
      ConfirmNewPassword: '',
    };
  },
  methods: {
    ChangePassword() {
      if (this.OldPassword === '') {
        this.$message({
          type: 'error',
          text: 'Old Password is required',
        });
        return;
      }
      if (this.NewPassword === '') {
        this.$message({
          type: 'error',
          text: 'New Password is required',
        });
        return;
      }
      if (this.ConfirmNewPassword === '') {
        this.$message({
          type: 'error',
          text: 'Confirm New Password is required',
        });
        return;
      }
      if (this.OldPassword.length < 8) {
        this.$message({
          type: 'error',
          text: 'Old Password is incorrect',
        });
        return;
      }
      if (this.NewPassword.length < 8) {
        this.$message({
          type: 'error',
          text: 'New Password must be 8 or more Characters',
        });
        return;
      }
      if (this.ConfirmNewPassword !== this.NewPassword) {
        this.$message({
          type: 'error',
          text: 'New Password must match Confirm Password',
        });
        return;
      }

      const Form = {
        old_password: this.OldPassword,
        new_password: this.NewPassword,
        confirm_password: this.ConfirmNewPassword,
      };

      this.$api.PutChangePassword(Form).then((res) => {
        this.$message({
          type: 'success',
          text: res.message,
        });
        this.ClearFields();
      }).catch((err) => {
        this.$message({
          type: 'error',
          text: err.data.message,
        });
      }).finally(() => {
      });
    },


    ClearFields() {
      this.OldPassword = '';
      this.NewPassword = '';
      this.ConfirmNewPassword = '';
    },

  },
  created() {
  },
};
</script>
