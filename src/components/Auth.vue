<template>
  <div class="auth__container">
    <div class="dropdown__default">
      <ButtonPrimary
        v-if="showSave"
        aria-expanded="false"
        aria-labelledby="dropdownMenuButton"
        @click.native="toggleDropdown"
      >Save</ButtonPrimary>
      <ButtonPrimary class="auth__btn-logout" @click.native="logOut" v-if="showLogout">Log out</ButtonPrimary>
      <ul :class="[isActive ? 'active' : '', 'dropdown__menu-default']">
        <li>
          <router-link class="auth__btn-signup" :to="{ name: 'signup' }" v-if="showSignup">Sign up</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'login' }" v-if="showLogin">Log in</router-link>
        </li>
      </ul>
    </div>
    <!-- menu on mobile viewport -->
    <div class="dropdown__mobile">
      <button class="btn__icon" @click="toggleDropdownMobile">
        <IconUser />
      </button>
      <ul :class="[isActiveOnMobile ? 'active' : '', 'dropdown__menu-mobile']">
        <li>
          <router-link class="auth__btn-signup" :to="{ name: 'signup' }" v-if="showSignup">Sign up</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'login' }" v-if="showLogin">Log in</router-link>
        </li>
        <li @click="logOut" v-if="showLogout">Log out</li>
      </ul>
    </div>
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
      isActive: false,
      isActiveOnMobile: false
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
      return this.username !== null;
    },
    showSave() {
      console.log(this.videos == []);
      return this.videos !== [];
    }
  },
  methods: {
    logOut() {
      this.$store.commit("deleteAllVideos");
      this.$store.commit("unsetUsername");
      window.location.reload();
    },
    toggleDropdown() {
      this.isActive = !this.isActive;
    },
    toggleDropdownMobile() {
      this.isActiveOnMobile = !this.isActiveOnMobile;
    }
  }
};
</script>
<style scoped>
.auth__container {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  margin-top: 3rem;
}

.dropdown__default,
.dropdown__mobile {
  grid-area: 1 / 1 / 2 / 2;
  display: grid;
  justify-items: right;
}

.dropdown__default button,
.dropdown__mobile button {
  grid-area: 1/1/2/2;
}

.dropdown__menu-default,
.dropdown__menu-mobile,
.dropdown__mobile {
  visibility: hidden;
}

.active {
  visibility: visible;
}

@media (max-width: 20rem) {
  .dropdown__mobile {
    visibility: visible;
  }

  .dropdown__default {
    visibility: hidden;
  }
}
@media (min-width: 20rem) {
  .dropdown__mobile {
    visibility: visible;
  }

  .dropdown__default {
    visibility: hidden;
  }
}

@media (min-width: 40rem) {
  .dropdown__mobile {
    visibility: hidden;
  }

  .dropdown__default {
    visibility: visible;
  }
}
</style>