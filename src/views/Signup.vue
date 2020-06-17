<template>
  <div class="auth-container">
    <div class="form-container">
      <form autocomplete="false">
        <h2 class="form-title">Create an account</h2>
        <div class="autocomplete-fix">
          <input type="password" disabled />
        </div>
        <div class="input-group">
          <input type="text" placeholder="Username" v-model="username" />
          <input type="password" placeholder="Password" v-model="
          password" />
        </div>
        <button class="signup-btn" id="sign-up-btn" @click.stop.prevent="signUp">Sign up</button>
        <span class="divider line one-line" contenteditable>or</span>
        <p>Already have an account?</p>
        <router-link :to="{name: 'login'}">
          <button class="login-btn">Log in</button>
        </router-link>
      </form>
    </div>
  </div>
</template>
<script>
import { db } from "../firebase";
import { mapState } from "vuex";

export default {
  name: "signup",
  data() {
    return { username: null, password: null };
  },
  computed: {
    ...mapState(["videos"])
  },
  methods: {
    async signUp() {
      const user = await db
        .collection("users")
        .doc(this.username)
        .get();

      let videos = this.videos;
      if (user.exists) {
        alert("User already exist!");
      } else {
        db.collection("users")
          .doc(this.username)
          .set({
            password: this.password,
            videos: videos
          });
        this.$store.commit("setUsername", this.username);
        this.$router.push("/feedback");
      }
    }
  }
};
</script>
<style>
</style>