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
import Logo from "@/assets/icons/cuttle-logo-v1.svg";

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

<style>
@import url("https://fonts.googleapis.com/css2?family=Allerta+Stencil&family=Lato&display=swap");
:root {
  font-size: 16px; /* 1rem */
  font-family: "Lato", sans-serif;
  --teal: #60b3b0;
  --black: #050505;
  --color-dark: #a63f42;
  --color-light: #fffbe6;
  --btn-primary-bg: #a63f42;
  --btn-primary-border: #69140e;
  --btn-secondary-bg: #e3f2f1;
  --btn-secondary-border: #60b3b0;
  --btn-mute-bg: #ebebeb;
  --btn-color: var(--color-light);
  --btn-mute-color: #c0c0c0;
  --btn-cancel-color: hsl(0, 0, 75%);
  --btn-delete-bg: #4a1c1e;
  --btn-delete-border: #a63f42;

  --color-placeholder: #8f3900;

  --footer-bg: #a63f42;
  --footer-color: var(--color-light);
  --border: #dddedf;
}

html {
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
}
body {
  color: var(--color-dark);
  min-height: 100%;
  width: 100%;
  margin: 0;
  display: grid;
  grid-template-rows: 1fr auto;
  position: relative;
}

ul {
  list-style: none;
  padding: 0;
}

label,
input {
  display: inline-block;
  font-family: inherit;
  font-size: 100%;
  box-sizing: border-box;
  -webkit-appearance: none;
  -moz-appearance: none;
}

input[type="submit"] {
  padding: 0.7em 1.4em;
  margin: 0 0.3em 0.3em 0;
  border-radius: 0.3rem;
  border-style: none;
  background-color: var(--btn-primary-bg);
  text-decoration: none;
  text-transform: uppercase;
  font-size: 0.8rem;
  color: #fdf6e3;
  box-shadow: inset 0 -0.6em 0 -0.35em rgba(230, 221, 221, 0.17);
  text-align: center;
  position: relative;
}

input:focus {
  outline: none;
}

input:active {
  top: 0.1em;
}

a {
  text-decoration: none;
  cursor: pointer;
}

a,
a:active {
  color: var(--btn-secondary-border);
}

a:hover {
  cursor: pointer;
}

.app__container {
  display: grid;
  width: 100%;
  grid-template-areas:
    "header"
    "main"
    "footer";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.app__header {
  padding: 2rem 2rem 0;
  grid-area: header;
  display: grid;
  grid-template-areas: "back logo account";
  grid-template-columns: repeat(3, minmax(3rem, 1fr));
  grid-template-rows: 1fr;
}

.header__back {
  grid-area: back;
}

.header__auth {
  overflow: visible;
  display: grid;
  justify-items: right;
}

.app__logo {
  margin: auto;
  min-width: 8rem;
  max-width: 20rem;
}

.app__logo-mobile {
  grid-area: logo;
  visibility: hidden;
}

.app__logo-default {
  display: none;
  margin-bottom: 5rem;
}

.app__main {
  grid-area: main;
}

.hide {
  visibility: hidden;
}

.app__footer {
  grid-area: footer;
  min-height: 8rem;
  background-color: var(--footer-bg);
  display: grid;
  align-items: center;
  text-align: center;
  font-weight: 600;
  color: var(--footer-color);
}

.btn__icon {
  border: none;
  background-color: unset;
  cursor: pointer;
}

/*
authentication
 */
.auth__form {
  width: 90%;
  text-align: center;
  margin: auto;
  border: 1px solid var(--border);
  border-radius: 0.2rem;
}

.auth__form form {
  padding: 2rem;
}

.auth__form input {
  display: block;
  width: 100%;
  margin-bottom: 4px;
  font-size: 12px;
  line-height: 2;
  border: 0;
  border-bottom: 1px solid var(--border);
  padding: 4px 8px;
  font-family: inherit;
  transition: 0.5s all;
  font-size: 0.8rem;
}

.autocomplete-fix {
  position: absolute;
  visibility: hidden;
  overflow: hidden;
  opacity: 0;
  width: 0;
  height: 0;
  left: 0;
  top: 0;
}
.divider {
  display: flex;
}
.divider:before,
.divider:after {
  content: "";
  flex: 1;
}

.line {
  align-items: center;
  margin: 1em -1em;
}
.line:before,
.line:after {
  height: 1px;
  margin: 0 0.8em;
}

.one-line:before,
.one-line:after {
  background: var(--border);
}

.input-group {
  margin: 2rem 0;
}

.btn__signup,
.btn__login {
  width: 100%;
}

.btn__login {
  background-color: var(--btn-secondary-bg);
  color: var(--teal);
  box-shadow: inset 0 -0.6em 0 -0.35em var(--btn-secondary-border);
}

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
