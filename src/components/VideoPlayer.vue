<template>
  <div class="player">
    <video ref="videoPlayer" class="video-js"></video>
    <button v-on:click="currentTime">Save notes</button>
  </div>
</template>

<script>
import videojs from "video.js";
import { bus } from "../main";
import { mapState } from "vuex";

export default {
  name: "VideoPlayer",
  data() {
    return {
      startTime: {
        type: Number,
      },
    };
  },
  computed: mapState(["url", "notes"]),
  methods: {
    currentTime: function() {
      console.log(this.player.currentTime());
      return this.$store.commit("updateNotes", [
        this.url,
        this.player.currentTime(),
      ]);
    },
  },
  watch: {
    url(newVal, oldVal) {
      console.log("n", newVal, "o", oldVal, "player", this.player.src());
      this.url = newVal;
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
        autoplay: true,
        controls: true,
        responsive: true,
        muted: false,
        techOrder: ["youtube"],
        sources: [
          {
            type: "video/youtube",
            src: this.url,
          },
        ],
      },
      function onPlayerReady() {
        console.log("onPlayerReady", this);
      }
    );
    bus.$on("setStartTime", (value) => {
      console.log("passed value", value);
      this.player.currentTime(value);
    });
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
.player {
  display: inline-block;
}
</style>
