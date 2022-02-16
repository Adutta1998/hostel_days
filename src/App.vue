<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <span>Fund Tracker</span>
      </div>

      <v-spacer></v-spacer>

      <v-btn @click="loginWithGoogle" text v-if="user == null"> Login </v-btn>
      <v-btn @click="logout" text v-if="user != null">
        <span class="mr-2">{{ user.displayName }}</span>
        <v-img :src="user.photoURL" width="48"></v-img>
      </v-btn>
      <v-btn text v-if="user != null" to="/stats"> Stats </v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import {
  onAuthStateChanged,
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
export default {
  name: "App",

  data: () => ({
    user: null,
  }),
  beforeMount() {
    const auth = getAuth();

    auth.onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
      } else {
        console.log("Not Authenticated");
        this.user = null;
      }
    });
  },
  methods: {
    loginWithGoogle() {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();

      signInWithPopup(auth, provider)
        .then((result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          this.user = result.user;
          console.log(this.user);
        })
        .catch((error) => {
          console.log(error);
          const errorCode = error.code;
          const errorMessage = error.message;
          const email = error.email;
          const credential = GoogleAuthProvider.credentialFromError(error);
        });
    },
    logout() {
      // console.log("here");
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          this.user = null;
        })
        .catch((error) => {
          // An error happened.
        });
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@100;400;700&display=swap");
* {
  font-family: "Montserrat", sans-serif;
}
</style>