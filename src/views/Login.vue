<template>
  <div class="grid justify-items-center">
    <form
      @submit.prevent="logIn"
      autocomplete="false"
      class="grid w-full p-2 gap-4 sm:w-2/4"
    >
      <h2 class="text-center">Welcome back!</h2>
      <div class="grid gap-2">
        <input
          class="p-1 rounded border-2"
          required
          type="text"
          placeholder="Username"
          v-model="username"
        />
        <input
          required
          type="password"
          placeholder="Password"
          v-model="password"
          class="p-1 rounded border-2"
        />
      </div>
      <base-button variant="DARKGRAY"> Log in </base-button>
      <div class="divide-solid divide-y-2 divide-gray-500">
        <div class="text-center py-2">or</div>
      </div>
      <h2 class="text-center">Need an account?</h2>
      <router-link :to="{ name: 'signup' }">
        <base-button variant="RED" class="w-full"> Sign up </base-button>
      </router-link>
    </form>
  </div>
</template>

<script>
import { db } from "../firebase";
import { mapState } from "vuex";

export default {
  name: "loginForm",
  data() {
    return { username: null, password: null };
  },
  computed: {
    ...mapState(["videos"]),
  },
  methods: {
    async logIn() {
      const user = await db.collection("users").doc(this.username).get();
      const userData = user.data();
      const serverVideos = userData.videos;
      if (userData.password === this.password) {
        this.$store.commit("setUsername", this.username);
        this.$store.commit("updateVideos", serverVideos);
        this.$router.push("/");
      } else {
        alert("Username or password is incorrect, please try again");
      }
    },
  },
};
</script>