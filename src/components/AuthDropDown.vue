<template>
  <div class="relative">
    <base-button
      aria-expanded="false"
      aria-labelledby="dropdownMenuButton"
      @click.native="toggleDropdown"
      v-click-outside="closeDropdown"
      variant="DARKGRAY"
      class="w-24"
    >
      Account
    </base-button>
    <div
      v-if="!showLogout"
      class="absolute right-0 mt-2 py-2 w-32 bg-white rounded-lg shadow-xl"
      :class="[isOpen ? 'visible' : 'invisible']"
    >
      <router-link
        :to="{ name: 'signup' }"
        v-if="showSignup"
        class="block px-4 py-2 text-gray-800 hover:bg-gray-500 hover:text-white"
        >Sign up</router-link
      >
      <router-link
        class="block px-4 py-2 text-gray-800 hover:bg-gray-500 hover:text-white"
        :to="{ name: 'login' }"
        v-if="showLogin"
        >Log in</router-link
      >
    </div>
    <div
      v-else
      class="absolute right-0 mt-2 py-2 w-32 bg-white rounded-lg shadow-xl"
      :class="[isOpen ? 'visible' : 'invisible']"
    >
      <a
        class="block px-4 py-2 text-gray-800 hover:bg-gray-500 hover:text-white"
        @click="logOut"
        v-if="showLogout"
        >Log out</a
      >
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "authDropdown",
  data() {
    return {
      isOpen: false,
    };
  },
  computed: {
    ...mapState(["username", "videos"]),
    showSignup() {
      return this.$route.name !== "signup" && this.username === null;
    },
    showLogin() {
      return this.$route.name !== "login" && this.username === null;
    },
    showLogout() {
      return this.username && this.username !== null;
    },
  },
  methods: {
    logOut() {
      this.$store.commit("deleteAllVideos");
      this.$store.commit("unsetUsername");
      this.$route.name === "home"
        ? window.location.reload()
        : this.$router.push("/");
    },
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    closeDropdown() {
      this.isOpen = false;
      this.$emit("change", this.isOpen);
    },
  },
};
</script>