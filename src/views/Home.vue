<template>
  <v-container fullscreen class="ma-0 pa-0" grid-list-xl>
    <div class="text-center">
      <h2 class="mb-2">Selamat datang di Bloggs</h2>
      <v-progress-linear color="teal lighten-4" height="7"></v-progress-linear>
    </div>
    <div class="text-right mt-5">
      <v-btn small text to="/blogs" class="blue--text">
        All Blogs <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </div>

    <v-layout wrap>
      <blog-item-component 
        v-for="blog in blogs" 
        :key="`blog-${blog.id}`"
        :blog="blog"
      >
      </blog-item-component>
    </v-layout>
  </v-container>
</template>

<script>
import BlogItemComponent from '../components/BlogItemComponent.vue'

export default {
  data: () => ({
    apiDomain : 'https://demo-api-vue.sanbercloud.com',
    blogs : [],
  }),
  components : {
    'blog-item-component' : BlogItemComponent
  },
  computed : {

  },
  methods : {
    go() {
      const config = {
        method : 'get',
        url : this.apiDomain + '/api/v2/blog/random/8'
      }
      
      this.axios(config)
        .then(response => {
          let { blogs } = response.data;
          this.blogs = blogs;
        })
        .catch(error =>{
          console.log(error)
        })
    },
  },
  created () {
    this.go()
  }
}
</script>