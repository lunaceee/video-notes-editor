<template>
  <div id="app" class="app__container">
    <header class="app__header">
      <div class="header__back">
        <GoBack :class="[isHomePage ? 'hide' : '']" />
      </div>
      <div class="app__logo app__logo-mobile">
        <router-link :to="{name: 'home'}">
          <Logo />
        </router-link>
      </div>
      <div class="header__auth">
        <Auth />
      </div>
    </header>
    <main class="app__main">
      <div class="app__logo app__logo-default">
        <router-link :to="{name: 'home'}">
          <Logo />
        </router-link>
      </div>
      <AddURLForm v-show="isHomePage" />
      <router-view :key="$route.path" />
    </main>
    <footer class="app__footer">
      <span>
        Made for you by
        <a href="https://github.com/lunaceee">lunaceee</a>
      </span>
    </footer>
  </div>
</template>

<script>
import GoBack from "@/components/GoBack.vue";
import AddURLForm from "@/components/addUrlForm.vue";
import Auth from "@/components/Auth.vue";
import Logo from "@/assets/icons/logo.svg";

export default {
  name: "Cuttle",
  data() {
    return {
      isMobile: false,
    };
  },
  components: {
    AddURLForm,
    GoBack,
    Auth,
    Logo,
  },
  computed: {
    isHomePage() {
      return this.$route.path === "/";
    },
  },
};
</script>

<style lang="postcss">
@media (max-width: 20rem) {
  .app__logo-mobile {
    visibility: visible;
  }

  .app__logo {
    min-width: 4rem;
  }

  .header__back {
    margin-top: 1rem;
  }
}

@media (min-width: 20rem) {
  .auth__form {
    width: 20rem;
  }

  .app__logo-mobile {
    visibility: visible;
  }

  .header__back {
    padding-top: 0.8rem;
  }

  .app__logo {
    min-width: 6rem;
  }
}

@media (min-width: 40rem) {
  .app__main {
    margin: 5rem;
  }
  .app__logo-mobile {
    visibility: hidden;
  }

  .app__logo-default {
    display: block;
  }
}
</style>
