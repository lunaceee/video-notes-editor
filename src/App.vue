<template>
  <div id="app" class="container">
    <div class="content">
      <header>
        <h1>Video notes editor</h1>
        <AddURLForm v-if="!isVideoDetailPage" />
      </header>
      <main>
        <transition name="fade" mode="out-in">
          <router-view :key="$route.path" />
        </transition>
      </main>
    </div>
    <footer class="footer">Made by @lunaceee with Video.js and Vue.js</footer>
  </div>
</template>

<script>
import AddURLForm from "@/components/addUrlForm.vue";

export default {
  name: "VideoNotesEditor",
  components: {
    AddURLForm
  },
  computed: {
    isVideoDetailPage() {
      const decUri = decodeURIComponent(this.$route.path);
      if (decUri == `/${this.$route.params["slug"]}`) {
        return true;
      } else {
        return false;
      }
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
}
body {
  min-height: 100%;
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

button:focus,
input:focus {
  outline: none;
}

button:active,
input:active {
  top: 0.1em;
}

h1 {
  margin: 3rem 0;
}

.container {
  font-family: "Open Sans", sans-serif;
  text-align: center;
  color: #2c3e50;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: grid;
  grid-template-areas:
    "content"
    "footer";
}

.content {
  grid-area: content;
}

.footer {
  min-height: 6rem;
  background-color: #b2ebf2;
  display: grid;
  align-items: center;
  grid-row-start: 4;
  grid-row-end: 5;
}
</style>
