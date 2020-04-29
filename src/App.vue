<template>
  <div id="app">
    <h1>Vue Videojs player</h1>
    <form @submit.prevent="onSubmit">
      <input type="text" placeholder="Insert URL" :value="newUrl" />
      <input type="submit" value="Change URL" />
    </form>
    <transition name="fade" mode="out-in">
      <router-view :key="$route.path" />
    </transition>
  </div>
</template>

<script>
export default {
  name: "VideoNotesEditor",
  data() {
    return { newUrl: "" };
  },
  methods: {
    onSubmit(e) {
      this.newUrl = e.target[0].value;
      this.$store.commit("updateUrl", this.newUrl);
      this.newUrl = null;
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
