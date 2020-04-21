<template>
  <div id="app">
    <h1>Vue Videojs player</h1>

    <video-player :options="videoOptions" />
    <you-tube />
  </div>
</template>

<script>
import VideoPlayer from "@/components/VideoPlayer.vue";
import YouTube from "./components/YouTube.vue";

export default {
  name: "VideoExample",
  components: {
    VideoPlayer,
    YouTube,
  },
  data() {
    return {
      videoOptions: {
        autoplay: false,
        controls: true,
        responsive: true,
        muted: false,
        techOrder: ["youtube"],
        sources: [
          {
            type: "video/youtube",
            src: "https://www.youtube.com/watch?v=2LP3xyvkJEk",
          },
        ],
      },
    };
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
