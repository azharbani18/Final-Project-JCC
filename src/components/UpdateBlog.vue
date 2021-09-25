<template>
  <v-card>
    <v-toolbar dark color="success">
      <v-btn icon dark @click.native="close">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title>{{ titleForm }}</v-toolbar-title>
    </v-toolbar>

    <v-divider></v-divider>

    <v-container fluid>
      <v-form ref="form">
        <v-text-field
          v-model="blog.title"
          label="Title"
          required
          append-icon="mdi-user"
        ></v-text-field>
        <v-text-field
          v-model="blog.description"
          label="description"
          required
          append-icon="mdi-email"
        ></v-text-field>
        <input type="file" ref="photo" class="mt-3" />

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
      blog: {},
      apiDomain: "https://demo-api-vue.sanbercloud.com",
    };
  },
  computed: {
    ...mapGetters({
      titleForm: "dialog/params",
      token: "auth/token",
    }),
  },
  created() {
    this.go();
  },
  methods: {
    ...mapActions({
      setAlert: "alert/set",
      setStatus: "dialog/setStatus",
    }),
    go() {
      let { id } = this.$route.params;

      const config = {
        method: "get",
        url: `${this.apiDomain}/api/v2/blog/${id}`,
      };

      this.axios(config)
        .then((response) => {
          let { blog } = response.data;
          console.log(blog.photo);
          this.blog = blog;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    close() {
      this.$emit("closed", false);
    },
    submit() {
      let formData = new FormData();
      formData.append("title", this.blog.title);
      formData.append("description", this.blog.description);
      const config = {
        method: "post",
        url: `${this.apiDomain}/api/v2/blog/${this.blog.id}?_method=PUT`,
        data: formData,
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + this.token,
        },
      };
      this.axios(config)
        .then(() => {
          if (this.$refs.photo.files[0] != undefined) {
            this.uploadPhoto();
          }
          this.setAlert({
            status: true,
            color: "success",
            text: "Edit Berhasil",
          });
          this.setStatus(false);
          this.$router.go();
        })
        .catch((response) => {
          console.log(response);
          this.setAlert({
            status: true,
            color: "error",
            text: "Edit Gagal",
          });
        });
      this.uploadPhoto();
    },
    uploadPhoto() {
      let photo = this.$refs.photo.files[0];
      let formData = new FormData();
      formData.append("photo", photo);
      const config = {
        method: "post",
        url: `${this.apiDomain}/api/v2/blog/${this.blog.id}/upload-photo`,
        data: formData,
        headers: {
          Authorization: "Bearer " + this.token,
        },
      };
      this.axios(config)
        .then(() => {
          this.setAlert({
            status: true,
            color: "success",
            text: "Edit Berhasil",
          });
        })
        .catch(() => {
          this.setAlert({
            status: true,
            color: "error",
            text: "Edit Gagal",
          });
        });
    },
  },
};
</script>
