<template>
  <ul class="account-controllers">
    <router-link :to="{ name: 'signup' }" v-if="showSignup">
      <button>Sign up</button>
    </router-link>
    <router-link :to="{ name: 'login' }" v-if="showLogin">
      <button class="login-btn">Log in</button>
    </router-link>
    <button class="logout-btn" @click="logOut" v-if="showLogout">
      Log out
    </button>
  </ul>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "authentication",
  computed: {
    ...mapState(["username"]),
    showSignup() {
      console.log(this.$route.name);
      console.log(this.username);
      return this.$route.name !== "signup" && this.username === null;
    },
    showLogin() {
      return this.$route.name !== "login" && this.username === null;
    },
    showLogout() {
      return this.username !== null;
    },
  },
  methods: {
    logOut() {
      this.$store.commit("deleteAllVideos");
      this.$store.commit("unsetUsername");
      this.$router.push("/");
    },
  },
};
</script>
<style scoped>
a {
  cursor: pointer;
}

li {
  display: inline-block;
}

.login-btn {
  width: auto;
}
</style>
