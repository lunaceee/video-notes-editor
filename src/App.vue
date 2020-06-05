<template>
  <div id="app" class="container">
    <header>
      <GoBack class="back" v-show="!isHomePage" />
      <transition name="heading">
        <img
          class="logo"
          :class="isHomePage ? '' : 'active'"
          alt="logo"
          src="./assets/cuttle-logo.svg"
        />
      </transition>
    </header>
    <main>
      <AddURLForm v-show="isHomePage" />
      <transition
        name="fade"
        mode="out-in"
        @beforeLeave="beforeLeave"
        @enter="enter"
        @afterEnter="afterEnter"
      >
        <router-view :key="$route.path" />
      </transition>
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

export default {
  name: "VideoNotesEditor",
  data() {
    return {
      prevHeight: 0
    };
  },
  components: {
    AddURLForm,
    GoBack
  },
  computed: {
    isHomePage() {
      return this.$route.path === "/";
    }
  },
  methods: {
    beforeLeave(element) {
      this.prevHeight = getComputedStyle(element).height;
    },
    enter(element) {
      const { height } = getComputedStyle(element);

      element.style.height = this.prevHeight;

      setTimeout(() => {
        element.style.height = height;
      });
    },
    afterEnter(element) {
      element.style.height = "auto";
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
  --btn-delete-bg: #C21900;
  --color: #356859;
  --color-light: #fffbe6;
  --color-light-green: #629686;
  --btn-primary-bg: #37966f;
  --btn-mute-bg: #e1e2e1;
  --footer-bg: #043d30;
  --video-overlay: #d6f0df;
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
  background-color: var(--bg);
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
  grid-row: 1/2;
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

main {
  grid-area: main;
  grid-row: 2/5;
}

.footer {
  min-height: 8rem;
  background-color: var(--footer-bg);
  display: grid;
  align-items: center;
  font-weight: 600;
  margin-top: 5rem;
  color: var(--color-light-green)
}

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: height, opacity;
  transition-timing-function: ease;
  overflow: hidden;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

@media (min-width: 80rem) {
  .active {
    transform: scale(1);
  }
}
</style>
