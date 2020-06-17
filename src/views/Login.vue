<template>
  <div class="auth-container">
    <div class="form-container">
      <form autocomplete="false">
        <h2 class="form-title">Welcome back!</h2>
        <div class="autocomplete-fix">
          <input type="password" disabled />
        </div>
        <div class="input-group">
          <input type="text" placeholder="Username" v-model="username" />
          <input type="password" placeholder="Password" v-model="
          password" />
        </div>
        <button class="login-btn" id="goto-login-btn" @click="logIn">Log in</button>
      </form>
      <span class="divider line one-line" contenteditable>or</span>
      <p>Need an account?</p>
      <router-link :to="{name: 'signup'}">
        <button class="signup-btn">Sign up</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import { db } from "../firebase";
import { mapState } from "vuex";

export default {
  name: "login",
  data() {
    return { username: null, password: null };
  },
  computed: {
    ...mapState(["videos"])
  },
  methods: {
    async logIn() {
      console.log("login", this.username);
      let videos = this.videos;
      const user = await db
        .collection("users")
        .doc(this.username)
        .get();
      const userData = user.data();
      const serverVideos = userData.videos;
      if (userData.password === this.password) {
        this.$store.commit("setUsername", this.username);
        this.$store.commit("updateVideos", serverVideos);
        this.$router.push("/");
      }
    }
  }
};
</script>
<style>
</style>