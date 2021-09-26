<template>
  <!-- App.vue -->
  <v-app>
    <alert />
    <Dialog></Dialog>
    <v-navigation-drawer app v-model="drawer">
      <v-list>

        <v-img src="./assets/logo_1.png"></v-img>

        <v-divider></v-divider>

        <v-list-item
          v-for="(item, index) in menus"
          :key="`menu-${index}`"
          :to="item.route"
        >
          <v-list-item-icon>
            <v-icon left>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="teal darken-1" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title color="primary">
        BLOGGS
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <div v-if="guest">
        <v-btn text class="ma-2 white--text" @click="login">
          Login
        </v-btn>
        <v-btn text class="ma-2 white--text" @click="register">
          Register
        </v-btn>
      </div>

      <v-menu bottom min-width="150px" rounded offset-y v-if="!guest">
        <template v-slot:activator="{ on }">
          <v-btn icon x-large v-on="on" class="mr-4">
            <v-avatar color="brown" size="48">
              <v-img
                :src="
                  user.photo_profile
                    ? apiDomain + user.photo_profile
                    : 'https://randomuser.me/api/portraits/men/42.jpg'
                "
              ></v-img>
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-list-item-content class="justify-center">
            <div class="mx-auto text-center">
              <v-avatar color="brown">
                <v-img
                  :src="
                    user.photo_profile
                      ? apiDomain + user.photo_profile
                      : 'https://randomuser.me/api/portraits/men/42.jpg'
                  "
                ></v-img>
              </v-avatar>
              <h3 class="px-1 mt-2">{{ user.name }}</h3>
              <p class="text-caption mt-1">
                {{ user.email }}
              </p>
              <v-divider class="mb-2"></v-divider>
              <v-btn text color="red" @click="logout">
                Logout
              </v-btn>
            </div>
          </v-list-item-content>
        </v-card>
      </v-menu>
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-main>
      <v-container fluid>
        <v-slide-y-transition>
          <router-view></router-view>
        </v-slide-y-transition>
      </v-container>
    </v-main>

    <v-footer
      dark
      padless
      app
      inset
    >
    <v-card
      class="flex"
      flat
      tile
      color="teal darken-1"
      :elevation="10"
    >

      <v-card-text class="py-2 white--text text-center">
        {{ new Date().getFullYear() }} — <strong>BLOGGS</strong>
      </v-card-text>
    </v-card>
    </v-footer>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "App",
  components: {
    Alert: () => import("./components/Alert.vue"),
    Dialog: () => import("./components/Dialog.vue"),
  },
  data: () => ({
    drawer: true,
    menus: [
      { title: "Home", icon: "mdi-home", route: "/" },
      { title: "Blogs", icon: "mdi-note", route: "/blogs" },
    ],
    apiDomain: "https://demo-api-vue.sanbercloud.com",
  }),
  computed: {
    ...mapGetters({
      guest: "auth/guest",
      user: "auth/user",
      token: "auth/token",
    }),
  },
  methods: {
    ...mapActions({
      checkToken: "auth/checkToken",
      setToken: "auth/setToken",
      setUser: "auth/setUser",
    }),
    logout() {
      let config = {
        method: "post",
        url: this.apiDomain + "/api/v2/auth/logout",
        headers: {
          Authorization: "Bearer " + this.token,
        },
      };

      this.axios(config)
        .then(() => {
          this.setToken("");
          this.setUser({});

          this.setAlert({
            status: true,
            color: "teal darken-1",
            text: "Anda berhasil logout",
          });
        })
        .catch((responses) => {
          this.setAlert({
            status: true,
            color: "error",
            text: responses.data.error,
          });
        });
    },
    login() {
      this.setDialogComponent({ component: "login", params: "Login" });
    },
    register() {
      this.setDialogComponent({ component: "register", params: "Register" });
    },
    ...mapActions({
      setAlert: "alert/set",
      setDialogComponent: "dialog/setComponent",
    }),
  },
  mounted() {
    if (this.token) {
      this.checkToken(this.token);
    }
    console.log(this.$store.state);
  },
};
</script>
