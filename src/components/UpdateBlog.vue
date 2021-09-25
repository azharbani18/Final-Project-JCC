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
          v-model="title"
          label="Title"
          required
          append-icon="mdi-user"
        ></v-text-field>
        <v-text-field
          v-model="description"
          label="description"
          required
          append-icon="mdi-email"
        ></v-text-field>
        <v-file-input
          value="photo"
          accept="image/png, image/jpeg, image/bmp"
          prepend-icon="mdi-camera"
          label="Photo Profile"
        ></v-file-input>

        <div class="text-xs-center">
          <v-btn color="primary lighten-1" @click="submit">
            Update
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
      photo: "",
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
      let formData = new FormData();
      formData.append("name", this.name);
      formData.append("password", this.password);
      formData.append("email", this.email);
      const config = {
        method: "post",
        url: this.apiDomain + "/api/v2/auth/register",
        data: {
          formData,
        },
        header: {
          Accept: "application/json",
        },
      };
      this.axios(config)
        .then((response) => {
          console.log(response);
          this.setAlert({
            status: true,
            color: "success",
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
    },
  },
};
</script>
