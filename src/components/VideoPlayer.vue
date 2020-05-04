<template>
  <div class="player">
    <video ref="videoPlayer" class="video-js"></video>
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
  props: {
    url: { type: String, required: true },
    controls: {
      default: true,
      type: Boolean,
    },
  },
  computed: mapState(["rawNotes"]),
  methods: {
    currentTime: function() {
      console.log(this.player.currentTime());
      return this.$store.commit("updateNotes", [
        this.url,
        this.player.currentTime(),
        "initial",
      ]);
    },
  },
  mounted() {
    console.log("mounted");
    this.player = videojs(
      this.$refs.videoPlayer,
      {
        autoplay: false,
        controls: this.controls,
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
