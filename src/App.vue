<template>
  <div id="app" class="container">
    <header>
      <GoBack class="back" v-show="!isHomePage" />
      <transition name="heading">
        <img class="logo" :class="isHomePage ? '' : 'active'" alt="logo" src="./assets/cuttle-logo.svg" />
      </transition>
    </header>
    <main>
      <AddURLForm :class="isHomePage ? '' : 'hide'" />
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
    <footer class="footer">Made by @lunaceee with Video.js and Vue.js</footer>
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
}
html {
  height: 100%;
  overflow-y: scroll;
}
body {
  min-height: 100%;
  width: 100%;
  display: grid;
  margin: 0;
  grid-template-rows: 1fr auto;
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
  color: #ffffff;
  background-color: #e8569f;
  box-shadow: inset 0 -0.6em 0 -0.35em rgba(230, 221, 221, 0.17);
  text-align: center;
  position: relative;
}

.hide {
  visibility: hidden;
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
  color: #2c3e50;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.heading-move,
.logo {
  transition: all 0.4s ease;
}

header {
  grid-area: header;
  grid-row-start: 1;
  grid-row-end: 2;
  display: grid;
  height: 5rem;
  grid-template-areas: "back logo account";
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  margin: 0 2rem;
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
  grid-row-start: 2;
  grid-row-end: 4;
}

.footer {
  min-height: 8rem;
  background-color: #b2ebf2;
  display: grid;
  align-items: center;
  grid-row-start: 4;
  grid-row-end: 5;
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
