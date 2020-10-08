<template>
  <video
    class="video-js w-full h-vhxs md:h-vhmd xl:h-vhxl"
    ref="YouTubePlayer"
  ></video>
</template>

<script>
import videojs from "videojs-youtube/node_modules/video.js/dist/video.es";

import { getVideoId } from "../utils";

export default {
  name: "YouTubePlayer",
  data() {
    return {
      YouTubePlayer: null,
      videoID: getVideoId(this.url),
    };
  },
  props: {
    url: { type: String, required: true },
    controls: {
      default: true,
      type: Boolean,
    },
    playerHolder: { type: Object },
    clickedPlay: {
      type: Boolean,
    },
  },
  mounted() {
    const playerHolder = this.playerHolder;

    this.YouTubePlayer = videojs(this.$refs.YouTubePlayer, {
      autoplay: false,
      controls: this.controls,
      responsive: true,
      muted: false,
      techOrder: ["youtube"],
      playbackRates: [0.5, 0.75, 1, 1.25, 1.5, 2],
      sources: [
        {
          type: "video/youtube",
          src: this.url,
        },
      ],
    });

    if (playerHolder) {
      playerHolder.set(this.YouTubePlayer);
    }

    //A hacky way to ensure player is loaded. Mainly for the purpose of starting the video at a specific timestamp, without having to click twice on the play button

    this.YouTubePlayer.ready(() => {
      this.YouTubePlayer.play();
      setTimeout(() => {
        this.YouTubePlayer.pause();
      }, 1000);
    });

    this.YouTubePlayer.on("firstplay", function () {
      if (playerHolder) {
        playerHolder.notify("firstplay");
      }
    });
  },
  beforeDestroy() {
    if (this.YouTubePlayer) {
      this.YouTubePlayer.dispose();
    }
  },
};
</script>