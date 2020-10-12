<template>
  <vimeo-player
    :class="[notesSize === 0 ? 'player-size' : 'player-size-notes']"
    ref="vimeoPlayer"
    :url="url"
    :video-id="videoId"
    :resposive="true"
    @ready="onReady"
    @play="play"
  ></vimeo-player>
</template>
<script>
import { getVideoId } from "../utils";
export default {
  name: "VimeoPlayerWrapper",
  data() {
    return {
      videoId: getVideoId(this.url),
      VimeoPlayer: null,
      playerReady: false,
      firstPlayed: this.clickedPlay,
    };
  },
  computed: {
    notesSize: function () {
      const video = this.$store.getters.video(this.url);
      return video.notes.length;
    },
  },
  props: {
    url: { type: String, required: true },
    playerHolder: { type: Object },
    clickedPlay: {
      type: Boolean,
    },
  },
  methods: {
    onReady() {
      this.playerReady = true;
      this.playerHolder.set(this.$refs.vimeoPlayer);
    },
    play() {
      if (this.playerHolder) {
        this.firstPlayed = true;
        this.playerHolder.notify("firstplay");
      }
    },
  },
};
</script>
<style lang="postcss">
.player-size-notes > iframe,
.player-size > iframe {
  width: 100%;
  height: auto;
}

@media (min-width: 768px) {
  .player-size-notes > iframe,
  .player-size > iframe {
    height: 23rem;
  }
}

@media (min-width: 1024px) {
  .player-size > iframe {
    height: 35rem;
  }
  .player-size-notes > iframe {
    height: 20rem;
  }
}

@media (min-width: 1280px) {
  .player-size > iframe {
    height: 44rem;
  }

  .player-size-notes > iframe {
    height: 26rem;
  }
}

@media (min-width: 1440px) {
  .player-size > iframe {
    height: 50rem;
  }
  .player-size-notes > iframe {
    height: 29rem;
  }
}
</style>
