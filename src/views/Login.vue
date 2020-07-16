<template>
  <div class="auth">
    <div class="auth__form">
      <form @submit.prevent="logIn" autocomplete="false">
        <h2 class="form-title">Welcome back!</h2>
        <div class="autocomplete-fix">
          <input type="password" disabled />
        </div>
        <div class="input-group">
          <input required type="text" placeholder="Username" v-model="username" />
          <input required type="password" placeholder="Password" v-model="password" />
        </div>
        <ButtonPrimary class="btn__login" id="goto-login-btn" type="submit">Log in</ButtonPrimary>
        <span class="divider line one-line" contenteditable>or</span>
        <p>Need an account?</p>
        <router-link :to="{ name: 'signup' }">
          <ButtonPrimary class="btn__signup">Sign up</ButtonPrimary>
        </router-link>
      </form>
    </div>
  </div>
</template>

<script>
import { db } from "../firebase";
import { mapState } from "vuex";
import ButtonPrimary from "@/components/ButtonPrimary.vue";

export default {
  name: "login",
  data() {
    return { username: null, password: null };
  },
  components: { ButtonPrimary },
  computed: {
    ...mapState(["videos"])
  },
  methods: {
    async logIn() {
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
      } else {
        alert("Username or password is incorrect, please try again");
      }
    }
  }
};
</script>