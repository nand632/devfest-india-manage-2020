<template>
  <v-app-bar
  app 
  fixed 
  clipped-left 
  class="white black--text" style="box-shadow: 0 2px 6px 0 rgba(0,0,0,.12), inset  0 -1px 0 0 #dadce0"
  >
    <v-app-bar-nav-icon
      aria-label="Hamburger Btn"
      @click="toggleDrawer"
    ></v-app-bar-nav-icon>
    <v-toolbar-title class="google-font px-0" style="width:300px">
      <router-link
        to="/"
        class="google-font grey--text text--darken-2"
        style="text-decoration:none;font-size:110%"
        >DevFest India Manage</router-link
      >
    </v-toolbar-title>
    <v-spacer></v-spacer>
   
    <v-btn dark color="indigo" v-on:click="logout" class="ml-4" depressed>Logout</v-btn>
  </v-app-bar>
</template>

<script>
import FDK from "@/config/firebase";
import { mapGetters, mapMutations } from "vuex";
export default {
  data: () => ({
    timeout: 6000,
  }),
  computed: {
    ...mapGetters(["links"]),
  },
  methods: {
    ...mapMutations(["toggleDrawer"]),
    onClick(e, item) {
      e.stopPropagation();
      if (item.to || !item.href) return;
      this.$vuetify.goTo(item.href);
    },
    logout(){
      FDK.auth.signOut().then(() => {
        this.$router.replace("/login");
      });
    }
  },
};
</script>