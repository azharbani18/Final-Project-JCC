<template>
  <v-card>
    <v-toolbar dark color="success">
      <v-btn icon dark @click.native="close">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
    </v-toolbar>

    <v-divider></v-divider>

    <v-container fluid>
      <v-form ref="form">
        <v-text-field
          v-model="name"
          label="Nama"
          required
          append-icon="mdi-user"
        ></v-text-field>
        <v-text-field
          v-model="email"
          label="E-mail"
          required
          append-icon="mdi-email"
        ></v-text-field>
        <v-text-field
          v-model="password"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          label="Password"
          counter
          @click:append="showPassword = !showPassword"
        ></v-text-field>
        <v-file-input
          value="photo"
          accept="image/png, image/jpeg, image/bmp"
          prepend-icon="mdi-camera"
          label="Photo Profile"
        ></v-file-input>

        <div class="text-xs-center">
          <v-btn color="primary lighten-1" @click="submit">
            Register
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
      name: "",
      email: "",
      password: "",
      photo: "",
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
    }),
    close() {
      this.$emit("closed", false);
    },
    submit() {
      //   let formData = new FormData();
      console.log(this.photo);
      //   formData.append("name", this.name);
      //   formData.append("password", this.password);
      //   formData.append("email", this.email);
      //   formData.append("photo_profile", photo);
      //   const config = {
      //     method: "post",
      //     url: this.apiDomain + "/api/v2/auth/register",
      //     data: {
      //       formData,
      //     },
      //     header: {
      //       Accept: "application/json",
      //     },
      //   };
      //   this.axios(config)
      //     .then((response) => {
      //       console.log(response);
      //       this.setAlert({
      //         status: true,
      //         color: "success",
      //         text: "Login Berhasil",
      //       });
      //       this.close();
      //     })
      //     .catch((response) => {
      //       console.log(response);
      //       this.setAlert({
      //         status: true,
      //         color: "error",
      //         text: "Login Gagal",
      //       });
      //     });
    },
  },
};
</script>
