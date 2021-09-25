<template>
  <v-flex xs6>
    <v-card :to="`/blog/${blog.id}`">
      <v-img
        :src="
          blog.photo ? apiDomain + blog.photo : 'https://picsum.photos/200/300'
        "
        class="white--text"
        height="200px"
      >
        <v-card-title
          class="fill-height align-end"
          v-text="blog.title"
        ></v-card-title>
      </v-img>

      <v-card-actions>
        <v-progress-linear color="blue grey" height="7"></v-progress-linear>
      </v-card-actions>

      <v-card-actions>
        <span>{{ blog.title.substring(0, 15) }}...</span>
        <v-spacer></v-spacer>
        <div v-if="!guest">
          <v-btn color="warning" fab small dark @click.prevent="updateBlog">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn
            color="red"
            fab
            small
            dark
            @click.prevent="deleteBlog(blog.id)"
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data: () => ({
    apiDomain: "https://demo-api-vue.sanbercloud.com",
  }),
  props: ["blog"],
  computed: {
    ...mapGetters({
      token: "auth/token",
      guest: "auth/guest",
    }),
  },
  methods: {
    ...mapActions({
      setAlert: "alert/set",
      setDialogComponent: "dialog/setComponent",
    }),
    deleteBlog: function(id) {
      alert(id);
      console.log(this.token);
      const config = {
        method: "post",
        url: `${this.apiDomain}/api/v2/auth/blog/${id}?_method=DELETE`,
        headers: {
          Authorization: "Bearer " + this.token,
        },
      };

      this.axios(config)
        .then(() => {
          this.setAlert({
            status: true,
            color: "success",
            text: "Delete Berhasil",
          });
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
    updateBlog() {
      this.setDialogComponent({
        component: "UpdateBlog",
        params: "Update Blog",
      });
    },
  },
};
</script>
