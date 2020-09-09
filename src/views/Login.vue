<template>
  <v-main>
    <v-container class="my-5 fill-height">
      <v-row justify="center" align="center"> 
        <v-col md="4" lg="4" sm="6" cols="12" class="text-center">
          <v-img :src="require('@/assets/img/logo.png')"></v-img>
          <h4>Manage</h4>
          <p>
            Login with your Google Account
          </p>
          <v-btn outlined class="mt-3" v-on:click="signIn">
            <v-icon size="20px" left>mdi-google</v-icon>
            Sign In with Google</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import FDK from "../config/firebase";
export default {
  name: "Login",
  components: {},
  mounted() {
    if (FDK.auth.currentUser) {
      this.$router.replace("/");
    } else {
      this.alertMsg = "Kindly login";
    }
  },
  methods:{
      signIn() {
      var self = this;
      var provider = new FDK.firebase.auth.GoogleAuthProvider();

      FDK.firebase
        .auth()
        .signInWithPopup(provider)
        .then(function(result) {
          var token = result.credential.accessToken;
          var user = result.user;
        // console.log(user)
        })
        .catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          var email = error.email;
          var credential = error.credential;
          console.log(error);
          // ...
        });
    },
  }
};
</script>
