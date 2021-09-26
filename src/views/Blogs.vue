<template>
  <v-container grid-list-xl>
    <v-subheader class="mb-5">
        <h2>All Blogs</h2>
        <v-spacer></v-spacer>
        <v-btn color="teal darken-1" outlined @click.prevent="addBlog" v-if="!guest">
            <v-icon>mdi-plus</v-icon>
             tambah blog
        </v-btn>
    </v-subheader>
    
    <v-layout wrap>
      <blog-item-component 
        v-for="blog in blogs" 
        :key="`blog-${blog.id}`"
        :blog="blog"
      >
      </blog-item-component>
    </v-layout>

    <v-pagination
        v-model="page"
        @input="go"
        :length="lengthPage"
        :total-visible="perPage"
    >
    </v-pagination>
  </v-container>
</template>

<script>
import BlogItemComponent from '../components/BlogItemComponent.vue'
import { mapActions, mapGetters } from "vuex"
export default {
    data : () => ({
        apiDomain : 'https://demo-api-vue.sanbercloud.com',
        blogs : [],
        page : 0,
        lengthPage : 0,
        perPage : 0
    }),
    components : {
        'blog-item-component' : BlogItemComponent
    },
    computed: {
        ...mapGetters({
            guest : "auth/guest"
        }),
    },
    methods : {
        ...mapActions ({
            setAlert: "alert/set",
            setDialogComponent: "dialog/setComponent",            
        }),
        addBlog : function(){
            this.setDialogComponent({
            component: "AddBlog",
            params: "Tambah Blog",
            })
        },
        go(){
            const config = {
                method : 'get',
                url : this.apiDomain + '/api/v2/blog?page=' + this.page,
            }

            this.axios(config)
                .then(response => {
                    let { blogs } = response.data
                    this.blogs = blogs.data
                    this.page = blogs.current_page
                    this.lengthPage = blogs.last_page
                    this.perPage = blogs.per_page
                    console.log(response.data)
                })
                .catch(function(error) {
                    console.log(error)
                  })
            
        }
    },
    created () {
        this.go()
    }
}
</script>