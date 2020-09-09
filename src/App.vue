<template>
<!-- v-show="showDashboard || !$route.meta.requiresAuth" -->
  <v-app >
    <v-snackbar
      v-model="snackWithButtons"
      :timeout="timeout"
      bottom
      left
      class="snack"
    >
      {{ snackWithBtnText }}
      <template v-slot:action="{ attrs }">
        <v-spacer />
        <v-btn
          aria-label="Snackbar"
          dark
          text
          v-bind="attrs"
          color="#00f500"
          @click.native="refreshApp"
        >
          {{ snackBtnText }}
        </v-btn>
        <v-btn
          icon
          v-bind="attrs"
          aria-label="close"
          @click="snackWithButtons = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
    <Toolbar v-if="$route.meta.requiresAuth" />
    <Drawer v-if="$route.meta.requiresAuth" />
    <MainView />
    <AppFooter class="hidden-sm-and-down" />
  </v-app>
</template>

<script>
import Toolbar from "@/components/core/Toolbar";
import MainView from "@/components/core/Views";
import FDK from "@/config/firebase";
export default {
  name: "App",
  components: {
    Toolbar,
    MainView,
    Drawer: () => import("@/components/core/Drawer"),
    AppFooter: () => import("@/components/core/Footer"),
  },
  data: () => ({
    showDashboard: false,
    refreshing: false,
    registration: null,
    snackBtnText: "",
    snackWithBtnText: "",
    snackWithButtons: false,
    timeout: 6000,
  }),
  async beforeCreate() {
    if (FDK.auth.currentUser) {
      // console.log('Calling1')
      FDK.firestore.collection("admins").doc(FDK.auth.currentUser.uid).get().then(res=>{
        // console.log(res.exists)
        if(!res.exists){
          // alert('Not Authorized to use this Web App')
          FDK.auth.signOut().then(() => {
              this.$router.replace("/login");
              this.showDashboard = false;
          });
        }
      })
    } 
  },
  created() {
    document.addEventListener("swUpdated", this.showRefreshUI, { once: true });
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (this.refreshing) return;
      this.refreshing = true;
      window.location.reload();
    });
  },
  methods: {
    showRefreshUI(e) {
      this.registration = e.detail;
      this.snackBtnText = "Refresh";
      this.snackWithBtnText = "New version available!";
      this.snackWithButtons = true;
    },
    refreshApp() {
      this.snackWithButtons = false;
      if (!this.registration || !this.registration.waiting) {
        return;
      }
      this.registration.waiting.postMessage("skipWaiting");
    },
  },
};
</script>

<style scoped>
.snack >>> .v-snack__content {
  padding-right: 16px;
}
</style>
