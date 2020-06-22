<template>
  <div id="app" class="container">
    <header>
      <GoBack class="back" :class="[isHomePage ? 'hide' : '']" />
      <router-link :to="{name: 'home'}">
        <Logo class="logo" :class="[!isHomePage ? 'active' : '']" />
      </router-link>
      <Auth class="account" />
    </header>
    <main>
      <AddURLForm v-show="isHomePage" />
      <router-view :key="$route.path" />
    </main>
    <footer class="footer">
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
import Logo from "@/assets/icons/cuttle-logo.svg";

export default {
  name: "Cuttle",
  data() {
    return {
      prevHeight: 0
    };
  },
  components: {
    AddURLForm,
    GoBack,
    Auth,
    Logo
  },
  computed: {
    isHomePage() {
      return this.$route.path === "/";
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;1,300;1,400&display=swap");
:root {
  font-size: 16px; /* 1rem */
  --bg: #fffbe6;
  --btn-bg: #fd5523;
  --btn-delete-bg: #c21900;
  --color: #356859;
  --color-light: #fffbe6;
  --color-light-green: #629686;
  --btn-primary-bg: #37966f;
  --btn-mute-bg: #043d30;
  --footer-bg: #043d30;
  --video-overlay: #d6f0df;
  --border: #dddedf;
}

html {
  height: 100%;
  overflow-y: scroll;
}
body {
  color: var(--color);
  min-height: 100%;
  width: 100%;
  display: grid;
  margin: 0;
  grid-template-rows: 1fr auto;
}

ul {
  list-style: none;
}

button,
label,
input {
  display: inline-block;
  font-family: inherit;
  font-size: 100%;
  box-sizing: border-box;
  -webkit-appearance: none;
  -moz-appearance: none;
}

button,
input[type="submit"] {
  padding: 0.7em 1.4em;
  margin: 0 0.3em 0.3em 0;
  border-radius: 0.3rem;
  border-style: none;
  text-decoration: none;
  text-transform: uppercase;
  font-size: 0.8rem;
  color: #fdf6e3;
  background-color: var(--btn-bg);
  box-shadow: inset 0 -0.6em 0 -0.35em rgba(230, 221, 221, 0.17);
  text-align: center;
  position: relative;
}

a,
a:active {
  color: var(--btn-bg);
}

a {
  text-decoration: none;
}

button:focus,
input:focus {
  outline: none;
}

button:active,
input:active {
  top: 0.1em;
}

.container {
  display: grid;
  width: 100%;
  grid-template-areas:
    "header"
    "main"
    "footer";
  font-family: "Open Sans", sans-serif;
  text-align: center;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.heading-move,
.logo {
  transition: all 0.4s ease;
}

header {
  grid-area: header;
  display: grid;
  grid-template-areas: "back logo account";
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  padding: 2rem;
}

.back {
  grid-area: back;
  display: grid;
  justify-items: start;
}

.logo {
  grid-area: logo;
  margin: 2rem auto;
  transform: scale(1.3);
}

.account {
  grid-area: account;
  display: flex;
  justify-content: flex-end;
}

main {
  grid-area: main;
  min-height: 40rem;
}

.hide {
  visibility: hidden;
}

.footer {
  grid-area: footer;
  min-height: 8rem;
  background-color: var(--footer-bg);
  display: grid;
  align-items: center;
  font-weight: 600;
  color: var(--color-light-green);
}

/*
Login and signup form
 */

.auth-container {
  width: 100%;
  display: flex;
  justify-content: center;
}

.form-container {
  min-width: 16rem;
  padding: 2rem;
  margin: 2rem;
  border: 1px solid var(--border);
  border-radius: 0.2rem;
}

.form-container input {
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
.signup-btn,
.login-btn {
  width: 100%;
}
.login-btn {
  background-color: white;
  border: 1px solid var(--btn-primary-bg);
  color: var(--btn-primary-bg);
  box-shadow: inset 0 -0.6em 0 -0.35em var(--video-overlay);
}

@media (min-width: 20rem) {
  .logo {
    transition-duration: 1s;
    transform: scale(0.7);
    transition-timing-function: ease-in-out;
  }
}

@media (min-width: 40rem) {
  .logo {
    transition-duration: 1s;
    transform: scale(1);
    transition-timing-function: ease-in-out;
  }

  .active {
    transition-duration: 0.3s;
    transform: scale(0.8);
    transition-timing-function: ease-in-out;
  }
}
</style>
