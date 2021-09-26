<template>
    <v-card>
        <v-container fluid>
            <h2
                class="text-center"
            >LOGIN</h2>
            <h4
                class="text-center  grey--text mb-5"
            >Log in to your account so you can manage all of the blogs</h4>
            <v-divider class="mb-5"></v-divider>
            <v-form ref="form" lazy-validation>
                <h4 class="ml-1 mb-3">Email</h4>
                <v-text-field
                    v-model="email"
                    label="Email"
                    color="teal darken-1"
                    required
                    outlined
                    rounded
                    :rules="emailRules"
                    append-icon="mdi-email"
                ></v-text-field>
                <h4 class="ml-1 mb-3">Password</h4>
                <v-text-field
                    v-model = "password"
                    color="teal darken-1"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showPassword? 'text' : 'password'"
                    label="Password"
                    counter
                    outlined
                    rounded
                    :rules="passwordRules"
                    @click:append="showPassword = !showPassword"
                ></v-text-field>

                <v-alert
                    v-if="errors.length > 0"
                    border="right"
                    type="error"
                >
                    <ul v-for="error of errors" :key="error">
                        <li>{{error}}</li>
                    </ul>
                </v-alert>

                <div class="text-center mb-5">
                    <v-btn 
                        color="teal darken-1"
                        dark
                        block
                        rounded
                        @click="submit"
                    >
                    Login
                    <v-icon right dark>mdi-lock-open</v-icon>
                    </v-btn>
                </div>
            </v-form>
        </v-container>
    </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      errors: [],
      email: "",
      password: "",
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 8) || 'Password must be longer than 8 characters',
      ],
      showPassword: false,
      apiDomain: "https://demo-api-vue.sanbercloud.com",
    };
  },
  computed: {
    ...mapGetters({
      title: "dialog/params",
    }),
  },
  methods: {
    ...mapActions({
      setAlert: "alert/set",
      setToken: "auth/setToken",
    }),
    close() {
      this.$emit("closed", false);
    },
    validationForm() {
      this.errors = []
            
      if(!this.email || !this.password) {
        this.errors.push('data tidak valid')
      }

    },
    submit() {
      
      this.validationForm()

      if(this.errors.length === 0) {
        const config = {
          method: "post",
          url: this.apiDomain + "/api/v2/auth/login",
          data: {
            email: this.email,
            password: this.password,
          },
        };

        this.axios(config)
          .then((response) => {
            this.setToken(response.data.access_token);

            console.log(response.data);
            this.setAlert({
              status: true,
              color: "teal darken-1",
              text: "Login Berhasil",
            });
            this.close();
          })
          .catch((response) => {
            console.log(response);
            this.setAlert({
              status: true,
              color: "error",
              text: "Login Gagal",
            });
          });
      }
    },
  },
};
</script>
