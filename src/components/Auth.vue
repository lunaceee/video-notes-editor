<template>
  <div class="auth">
    <div class="auth__dropdown--trigger">
      <ButtonPrimary
        class="btn__default"
        aria-expanded="false"
        aria-labelledby="dropdownMenuButton"
        @click.native="toggleDropdown"
      >Account</ButtonPrimary>
      <button class="btn__icon--mobile btn__icon" @click="toggleDropdown">
        <IconUser />
      </button>
    </div>
    <ul :class="[isActive ? 'active' : '', 'auth__dropdown--list']">
      <li @click="toggleDropdown" class="auth__dropdown--item">
        <router-link :to="{ name: 'signup' }" v-if="showSignup">Sign up</router-link>
      </li>
      <li @click="toggleDropdown" class="auth__dropdown--item">
        <router-link :to="{ name: 'login' }" v-if="showLogin">Log in</router-link>
      </li>
      <li @click="toggleDropdown" class="auth__dropdown--item">
        <a @click="logOut" v-if="showLogout">Log out</a>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapState } from "vuex";
import ButtonPrimary from "@/components/ButtonPrimary.vue";
import IconUser from "@/assets/icons/IconUser.svg";

export default {
  name: "authentication",
  data() {
    return {
      isActive: false
    };
  },
  components: { ButtonPrimary, IconUser },
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
    }
  },
  methods: {
    onResize(event) {
      const ro = new ResizeObserver(entries => {
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
      this.isActive = !this.isActive;
    }
  },
  mounted() {
    // Register an event listener when the Vue component is ready
    window.addEventListener("resize", this.onResize);
  },
  beforeDestroy() {
    // Unregister the event listener before destroying this Vue instance
    window.removeEventListener("resize", this.onResize);
  }
};
</script>
<style scoped>
.auth {
  display: inline-block;
}
.auth__dropdown--trigger {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
}
.btn__default,
.btn__icon--mobile {
  grid-area: 1 / 1 / 2 / 2;
}

.auth__dropdown--list {
  visibility: hidden;
  background-color: var(--btn-mute-bg);
  margin-top: 0;
  border-radius: 0.2rem;
}

.active {
  visibility: visible;
}

.auth__dropdown--item {
  padding: 0.4rem;
  margin: auto;
}

.auth__dropdown--item > a {
  color: var(--black);
}
</style>