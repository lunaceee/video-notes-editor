<template>
  <div class="player">
    <video ref="videoPlayer" class="video-js"></video>
  </div>
</template>

<script>
import videojs from "video.js";

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
    playerHolder: { type: Object },
  },
  mounted() {
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
      }
    );

    if (this.playerHolder) {
      this.playerHolder.set(this.player);
    }
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
