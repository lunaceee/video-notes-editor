<template>
  <div id="app">
    <h1>Vue Videojs player</h1>
    <form @submit.prevent="onSubmit">
      <input type="text" placeholder="Add URL" />
      <input type="submit" value="Add URL" />
    </form>
    <transition name="fade" mode="out-in">
      <router-view :key="$route.path" />
    </transition>
  </div>
</template>

<script>
export default {
  name: "VideoNotesEditor",
  methods: {
    onSubmit(e) {
      const newUrl = e.target[0].value || "";
      if (newUrl) {
        this.$store.commit("addVideo", newUrl);
      } else {
        alert("Invalid Youtube URL");
      }
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
