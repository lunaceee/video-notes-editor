<template>
  <div class="player">
    <video ref="videoPlayer" class="video-js"></video>
    <button v-on:click="currentTime">Save notes</button>
  </div>
</template>

<script>
import videojs from "video.js";
import { mapState } from "vuex";

export default {
  name: "VideoPlayer",
  computed: mapState(["url"]),
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

      let url = this.url;

      let myArray = toArray(url);

      myArray.push(this.player.currentTime());

      localStorage[url] = myArray.toString();
    },
  },
  watch: {
    url(newVal, oldVal) {
      console.log("n", newVal, "o", oldVal, "player", this.player.src());
      this.player.src({
        type: "video/youtube",
        src: newVal,
      });
    },
  },
  mounted() {
    console.log("mounted");
    this.player = videojs(
      this.$refs.videoPlayer,
      {
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
