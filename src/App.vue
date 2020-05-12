<template>
  <div id="app" class="container">
    <header>
      <h1>Video notes editor</h1>
      <AddURLForm v-if="!isVideoDetailPage" />
      <GoBack v-if="isVideoDetailPage" />
    </header>
    <main>
      <transition name="fade" mode="out-in">
        <router-view :key="$route.path" />
      </transition>
    </main>
    <footer>Made by @lunaceee with Video.js and Vue.js</footer>
  </div>
</template>

<script>
import AddURLForm from "@/components/addUrlForm.vue";
import GoBack from "@/components/GoBack.vue";

export default {
  name: "VideoNotesEditor",
  components: {
    AddURLForm,
    GoBack
  },
  computed: {
    // isHomePage() {
    //   if (this.$router.path == `/`) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // },
    isVideoDetailPage() {
      const decUri = decodeURIComponent(this.$route.path);
      console.log(decUri);
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

button,
label,
input {
  display: inline-block;
  font-family: inherit;
  font-size: 100%;
  box-sizing: border-box;
}

button,
input[type="submit"] {
  padding: 0.7em 1.4em;
  margin: 0 0.3em 0.3em 0;
  border-radius: 0.3rem;
  box-sizing: border-box;
  text-decoration: none;
  text-transform: uppercase;
  font-size: 0.8rem;
  color: #ffffff;
  background-color: #e8569f;
  box-shadow: inset 0 -0.6em 0 -0.35em rgba(0, 0, 0, 0.17);
  text-align: center;
  position: relative;
}

.container {
  font-family: "Open Sans", sans-serif;
  text-align: center;
  color: #2c3e50;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: 1fr;
  grid-template-areas:
    "header"
    "main"
    "footer";
}

header,
main,
footer {
  margin: 1rem;
}

header {
}

main {
}

footer {
}

@media (min-width: 28rem) {
  .container {
    grid-template-columns: 1fr;
  }
}
</style>
