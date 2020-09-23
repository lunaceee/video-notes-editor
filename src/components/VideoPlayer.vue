<template>
  <div>
    <video
      class="video-js w-full h-vhxs md:h-vhmd xl:h-vhxl"
      ref="videoPlayer"
    ></video>
    <add-note-button
      :playerHolder="playerHolder"
      :url="url"
      :addNote="addNote"
      :clickedPlay="clickedPlay"
    />
  </div>
</template>

<script>
import videojs from "video.js";
import "@devmobiliza/videojs-vimeo/dist/videojs-vimeo.esm";
import addNoteButton from "@/components/addNoteButton.vue";

export default {
  name: "videoPlayer",
  components: {
    addNoteButton,
  },
  data() {
    return {
      player: null,
      startTime: {
        type: Number,
      },
      clickedPlay: false,
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
  methods: {
    clickPlay() {
      this.clickedPlay = true;
    },
    addNote() {
      this.$store.commit("addNote", {
        video: this.$store.getters.video(this.url),
        time: this.playerHolder.get().currentTime(),
        duration: this.playerHolder.get().duration(),
      });
    },
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
          src: this.url,
        },
      ],
    });

    const playerHolder = this.playerHolder;
    const clickPlay = this.clickPlay;

    //A hacky way to ensure player is loaded. Mainly for the purpose of starting the video at a specific timestamp, without having to click twice on the play button
    this.player.ready(() => {
      this.player.play();
      setTimeout(() => {
        this.player.pause();
      }, 1000);
    });

    this.player.on("firstplay", function () {
      clickPlay();
      if (playerHolder) {
        playerHolder.notify("firstplay");
      }
    });

    if (playerHolder) {
      playerHolder.set(this.player);
    }
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  },
};
</script>