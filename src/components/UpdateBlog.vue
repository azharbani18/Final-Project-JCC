<template>
  <v-card>
    <h2 class="text-center mb-3 pt-2">Edit Blog {{ blog.title }}</h2>
    <v-divider></v-divider>

    <v-container fluid>
      <v-form ref="form">
        <h4 class="ml-1 mb-3">Judul Blog</h4>
          <v-text-field
            v-model="blog.title"
            label="Judul"
            color="teal darken-1"
            required
            outlined
            rounded
            :counter="30"
            :rules="titleRules"
            append-icon="mdi-subtitles"
          ></v-text-field>
        
        <h4 class="ml-1 mb-3">Deskripsi Blog</h4>
        <v-textarea
          outlined
          rounded
          color="teal darken-1"
          name="input-7-4"
          label="Deskripsi"
          :counter="500"
          :rules="descriptionRules"
          v-model="blog.description"
          append-icon="mdi-subtitles"
        ></v-textarea>
        
        <h4 class="mb-3">Pilih Foto</h4>
        <input type="file" ref="photo" class="mb-5" />

        <div class="text-xs-center mb-3">
          <v-btn block rounded dark color="teal darken-1" @click="submit">
            Update Blog
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
      errors:[],
      blog: {},
      titleRules: [
        v => !!v || 'Title is required',
        v => (v && v.length <= 30) || 'Title must be less than 30 characters',
      ],
      descriptionRules: [
        v => !!v || 'Description is required',
        v => (v && v.length <= 500) || 'Description must be less than 500 characters',
      ],
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
    clear() {

    },
    go() {
      let { id } = this.$route.params;
      console.log(id)

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
    validateData() {
      this.errors = []

      if(!this.blog.title || !this.blog.description){
        this.errors.push("1")
      }

      if(this.blog.title.length > 30) {
        this.errors.push("2")
      }

      if(this.blog.description.length > 500) {
        this.errors.push("3")
      }
    },
    submit() {
      this.validateData()
      
      if(this.errors.length === 0) {
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
      }
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
