<template>
  <div id="app">
    <h1>Vue Videojs player</h1>
    <form @submit.prevent="onSubmit">
      <input type="text" placeholder="Insert URL" :value="newUrl" />
      <input type="submit" />
    </form>
    <video-player />
  </div>
</template>

<script>
import VideoPlayer from "@/components/VideoPlayer.vue";

export default {
  name: "VideoExample",
  components: {
    VideoPlayer,
  },
  methods: {
    onSubmit(e) {
      console.log("value", e.target[0].value);
      this.$store.commit("updateUrl", e.target[0].value);
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
