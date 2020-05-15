<template>
  <video ref="videoPlayer" class="video-js"></video>
</template>

<script>
import videojs from "video.js";

export default {
  name: "VideoPlayer",
  data() {
    return {
      player: null,
      startTime: {
        type: Number
      }
    };
  },
  props: {
    url: { type: String, required: true },
    controls: {
      default: true,
      type: Boolean
    },
    playerHolder: { type: Object }
  },
  mounted() {
    this.player = videojs(this.$refs.videoPlayer, {
      autoplay: false,
      controls: this.controls,
      responsive: true,
      muted: false,
      techOrder: ["youtube"],
      playbackRates: [0.5, 0.75, 1, 1.25, 1.5, 2],
      sources: [
        {
          type: "video/youtube",
          src: this.url
        }
      ]
    });

    if (this.playerHolder) {
      this.playerHolder.set(this.player);
    }
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
