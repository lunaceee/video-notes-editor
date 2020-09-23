<template>
  <div class="grid justify-items-center">
    <form
      @submit.prevent="signUp"
      autocomplete="false"
      class="grid w-full p-2 gap-4 sm:w-2/4"
    >
      <h2 class="text-center">Create an account</h2>
      <div class="grid gap-2">
        <input
          class="p-1 rounded border-2"
          type="text"
          placeholder="Username"
          v-model="username"
          required
        />
        <input
          class="p-1 rounded border-2"
          type="password"
          placeholder="Password"
          v-model="password"
          required
        />
      </div>
      <base-button variant="RED" type="submit"> Sign up </base-button>
      <div class="divide-dotted divide-y-2 divide-gray-500">
        <div class="text-center py-2">or</div>
      </div>
      <h2 class="text-center">Already have an account?</h2>
      <router-link :to="{ name: 'login' }">
        <base-button variant="TEAL" class="w-full"> Log in </base-button>
      </router-link>
    </form>
  </div>
</template>
<script>
import { db } from "../firebase";
import { mapState } from "vuex";

export default {
  name: "signupForm",
  data() {
    return { username: null, password: null };
  },
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
