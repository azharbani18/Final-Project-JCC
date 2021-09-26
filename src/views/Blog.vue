<template>
    <div>
        <div class="mb-2 ml-1">
          <span>Blog/</span><span><b>{{ blog.id }}</b></span>
        </div>
        <v-card v-if="blog.id">
            <v-img
            :src="blog.photo ? apiDomain + blog.photo : 'https://picsum.photos/200/300'"
            class="white--text"
            height="350px"
            >
                <v-card-title
                class="fill-height align-end"
                v-text="blog.title"
                ></v-card-title>
            </v-img>

      <v-card-text>
        <v-simple-table dense>
          <tbody>
            <tr>
              <td><v-icon>mdi-format-title</v-icon> Judul</td>
              <td class="blue--text">{{ blog.title }}</td>
            </tr>
            <tr>
              <td><v-icon>mdi-note</v-icon> Deskripsi</td>
              <td>
                {{ blog.description }}
              </td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-card-text>
      <div v-if="!guest" class="d-flex justify-end">
        <v-btn color="warning" class="ma-2 white--text" @click="updateBlog">
          Edit
          <v-icon right dark>
            mdi-pencil
          </v-icon>
        </v-btn>
        <v-btn
          color="red"
          class="ma-2 white--text"
          @click="deleteBlog(blog.id)"
        >
          Delete
          <v-icon right dark>
            mdi-delete
          </v-icon>
        </v-btn>
      </div>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data: () => ({
    blog: {},
    apiDomain: "https://demo-api-vue.sanbercloud.com",
  }),
  computed: {
    ...mapGetters({
      guest: "auth/guest",
      token: "auth/token",
    }),
  },
  methods: {
    ...mapActions({
      setAlert: "alert/set",
      setDialogComponent: "dialog/setComponent",
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
          this.blog = blog;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteBlog: function(id) {

      if(confirm("Yakin ingin menghapus blog ini?") === true) {
        const config = {
          method: "post",
          url: `${this.apiDomain}/api/v2/blog/${id}?_method=DELETE`,
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
            this.$router.push({ path: "/blogs" });
          })
          .catch((response) => {
            console.log(response);
            this.setAlert({
              status: true,
              color: "error",
              text: "Delete Gagal",
            });
          });
      }
    },
    updateBlog() {

      this.setDialogComponent({
        component: "UpdateBlog",
        params: {id:this.blog.id},
      });
    },
  },
  created() {
    this.go();
  },
};
</script>
