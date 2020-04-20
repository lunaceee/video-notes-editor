<template>
  <div id="app">
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
        muted: true,
        techOrder: ["youtube"],
        sources: [
          {
            type: "video/youtube",
            src: "https://www.youtube.com/watch?v=xjS6SftYQaQ",
          },
        ],
        breakpoints: {
          tiny: 300,
          xsmall: 400,
          small: 500,
          medium: 600,
          large: 700,
          xlarge: 800,
          huge: 900,
        },
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
