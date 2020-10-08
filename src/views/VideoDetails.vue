<template>
  <div
    class="grid grid-flow-row xl:grid-flow-col gap-8"
    :class="[notesSize === 0 ? 'lg:grid-cols-1' : 'lg:grid-cols-3']"
  >
    <div class="grid lg:col-span-2 gap-y-2">
      <div class="bg-yellow-200">
        <div v-if="isVimeo">
          <vimeo-player-wrapper
            :url="url"
            :playerHolder="playerHolder"
            :clickedPlay="clickedPlay"
          />
        </div>
        <div v-if="isYouTube">
          <you-tube-player
            :url="url"
            :playerHolder="playerHolder"
            :clickedPlay="clickedPlay"
          />
        </div>
      </div>
      <add-note-button
        :playerHolder="playerHolder"
        :url="url"
        :addNote="addNote"
        :clickedPlay="clickedPlay"
      />
    </div>
    <notes :url="url" :playNote="playNote" :pauseAll="pauseAll" />
  </div>
</template>
<script>
import { isVimeo, isYouTube, getVideoId } from "../utils";
import YouTubePlayer from "@/components/YouTubePlayer.vue";
import VimeoPlayerWrapper from "@/components/VimeoPlayerWrapper.vue";
import addNoteButton from "@/components/addNoteButton.vue";
import Notes from "@/components/Notes.vue";
import { mapState } from "vuex";

export default {
  name: "VideoDetails",
  data() {
    let video;
    return {
      isVimeo: isVimeo(this.$route.params["slug"]),
      isYouTube: isYouTube(this.$route.params["slug"]),
      clickedPlay: false,
      playerHolder: {
        set: (vid) => (video = vid),
        get: () => video,
        notify: (e) => {
          if (e === "firstplay") {
            this.clickedPlay = true;
          }
        },
      },
    };
  },
  components: {
    YouTubePlayer,
    VimeoPlayerWrapper,
    addNoteButton,
    Notes,
  },
  computed: {
    url: function () {
      return this.$route.params["slug"];
    },
    notesSize: function () {
      const video = this.$store.getters.video(this.url);
      return video.notes.length;
    },
    ...mapState(["playingNote"]),
  },
  methods: {
    async playNote(time, index) {
      this.$store.commit("changePlayingNote", index);

      if (this.isVimeo) {
        const vimeoPlayer = this.playerHolder.get().player;
        await vimeoPlayer.setCurrentTime(time);
        vimeoPlayer.play();
      } else if (this.isYouTube) {
        const youtubePlayer = this.playerHolder.get();
        youtubePlayer.currentTime(time);
        youtubePlayer.play();
      }
    },
    async pauseAll() {
      this.$store.commit("changePlayingNote", null);

      if (this.isVimeo) {
        const vimeoPlayer = this.playerHolder.get().player;
        vimeoPlayer.pause();
      } else if (this.isYouTube) {
        const youtubePlayer = this.playerHolder.get();
        youtubePlayer.pause();
      }
    },
    async addNote() {
      if (this.isYouTube) {
        this.$store.commit("addNote", {
          video: this.$store.getters.video(this.url),
          time: this.playerHolder.get().currentTime(),
          duration: this.playerHolder.get().duration(),
        });
      } else if (this.isVimeo) {
        const player = this.playerHolder.get().player;
        const currentTime = await player.getCurrentTime();
        const duration = await player.getDuration();

        this.$store.commit("addNote", {
          video: this.$store.getters.video(this.url),
          time: currentTime,
          duration: duration,
        });
      }
    },
  },
  beforeDestroy() {
    this.$store.commit("changePlayingNote", null);
  },
};
</script>