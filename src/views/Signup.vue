<template>
  <div class="auth">
    <div class="auth__form">
      <form @submit.prevent="signUp" autocomplete="false">
        <h2 class="form-title">Create an account</h2>
        <div class="autocomplete-fix">
          <input type="password" disabled />
        </div>
        <div class="input-group">
          <input type="text" placeholder="Username" v-model="username" required />
          <input type="password" placeholder="Password" v-model="password" required />
        </div>
        <base-button class="btn__signup" id="sign-up-btn" type="submit">Sign up</base-button>
        <span class="divider line one-line" contenteditable>or</span>
        <p>Already have an account?</p>
        <router-link :to="{ name: 'login' }">
          <base-button class="btn__login">Log in</base-button>
        </router-link>
      </form>
    </div>
  </div>
</template>
<script>
import { db } from "../firebase";
import { mapState } from "vuex";
import BaseButton from "@/components/BaseButton.vue";

export default {
  name: "signupForm",
  data() {
    return { username: null, password: null };
  },
  components: { BaseButton },
  computed: {
    ...mapState(["videos"]),
  },
  methods: {
    async signUp() {
      const user = await db.collection("users").doc(this.username).get();

      let videos = this.videos;

      if (user.exists) {
        alert("User already exist!");
        this.username = null;
        this.password = null;
      } else {
        db.collection("users").doc(this.username).set({
          password: this.password,
          videos: videos,
        });
        this.$store.commit("setUsername", this.username);
        this.$router.push("/feedback");
      }
    },
  },
};
</script>
