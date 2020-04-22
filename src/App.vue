<template>
  <div id="app">
    <h1>Vue Videojs player</h1>
    <form @submit.prevent="onSubmit">
      <input type="text" placeholder="Insert URL" :value="newUrl" />
      <input type="submit" />
    </form>
    <video-player :options="videoOptions" />
    <you-tube />

    <button v-on:click="currentTime">Save notes</button>
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
  methods: {
    onSubmit(e) {
      console.log("value", e.target[0].value);

      this.$store.commit("updateUrl", e.target[0].value);
    },
    currentTime: function() {
      console.log(this.player.currentTime());
      // Turn string into array
      function toArray(key) {
        if (!localStorage[key]) {
          return [];
        }
        return localStorage[key].split(",").map(parseFloat);
      }

      let url = this.url;

      let myArray = toArray(url);

      myArray.push(this.player.currentTime());

      localStorage[url] = myArray.toString();
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
