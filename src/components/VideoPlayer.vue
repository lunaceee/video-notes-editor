<template>
  <div class="player">
    <h1>Vue Videojs player</h1>
    <video ref="videoPlayer" class="video-js"></video>
    <button v-on:click="currentTime">Save notes</button>
  </div>
</template>

<script>
import videojs from "video.js";

export default {
  name: "VideoPlayer",
  props: {
    options: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      player: null,
    };
  },
  methods: {
    currentTime: function() {
      console.log(this.player.currentTime());
      // Turn string into array
      function toArray(key) {
        if (!localStorage[key]) {
          return [];
        }
        return localStorage[key].split(",").map(parseFloat);
      }
      let url = "https://www.youtube.com/watch?v=xjS6SftYQaQ";
      let myArray = toArray(url);

      myArray.push(this.player.currentTime());

      localStorage[url] = myArray.toString();
    },
  },
  mounted() {
    this.player = videojs(
      this.$refs.videoPlayer,
      this.options,
      function onPlayerReady() {
        console.log("onPlayerReady", this);
      }
    );
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.player {
  display: inline-block;
}
</style>
