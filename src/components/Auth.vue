<template>
  <div class="auth">
    <div class="auth__dropdown--toggle">
      <base-button
        aria-expanded="false"
        aria-labelledby="dropdownMenuButton"
        @click.native="toggleDropdown"
        v-click-outside="closeDropdown"
        secondary
        text="Account"
      ></base-button>
    </div>
    <div v-if="!showLogout">
      <ul :class="[isOpen ? 'active' : '', 'auth__dropdown--list']">
        <li @click="toggleDropdown" class="auth__dropdown--item">
          <router-link :to="{ name: 'signup' }" v-if="showSignup">Sign up</router-link>
        </li>
        <li @click="toggleDropdown" class="auth__dropdown--item">
          <router-link :to="{ name: 'login' }" v-if="showLogin">Log in</router-link>
        </li>
      </ul>
    </div>
    <div v-else>
      <ul :class="[isOpen ? 'active' : '', 'auth__dropdown--list']">
        <li @click="toggleDropdown" class="auth__dropdown--item">
          <a @click="logOut" v-if="showLogout">Log out</a>
        </li>
      </ul>
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
    onResize(event) {
      const ro = new ResizeObserver((entries) => {
        const btnDefault = document.querySelector(".btn__default");
        const btnMobile = document.querySelector(".btn__icon--mobile");
        for (let entry of entries) {
          console.log(entry);
          if (window.innerWidth < 768) {
            btnDefault.style.visibility = "hidden";
            btnMobile.style.visibility = "visible";
          } else {
            btnDefault.style.visibility = "visible";
            btnMobile.style.visibility = "hidden";
          }
        }
      });
      // Only observe the second box
      ro.observe(document.querySelector(".auth__dropdown--trigger"));
    },
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
<style>
.auth__dropdown--toggle {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
}

.btn__default,
.btn__icon--mobile {
  grid-area: 1 / 1 / 2 / 2;
}

.auth__dropdown--list {
  display: flex;
  flex-direction: column;
  justify-content: right;
  visibility: hidden;
  background-color: var(--btn-mute-bg);
  margin-top: 0;
  border-radius: 0.2rem;
  color: var(--light-blue);
}

.active {
  visibility: visible;
}

.auth__dropdown--item {
  padding: 0.6rem;
}

.auth__dropdown--item > a {
  color: var(--black);
}
</style>