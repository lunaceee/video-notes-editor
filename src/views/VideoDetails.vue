<template>
  <div class="video-details">
    <video-player
      :url="videoUrl"
      :playerHolder="playerHolder"
      :class="videoUrl !== '/' ? 'video' : ''"
    />
    <notes :url="videoUrl" class="notes" :playerHolder="playerHolder" />
    <button v-on:click="addNote" class="add-note">Add note</button>
  </div>
</template>
<script>
import VideoPlayer from "@/components/VideoPlayer.vue";
import Notes from "@/components/Notes.vue";
import { mapGetters } from "vuex";

export default {
  name: "VideoDetails",
  data() {
    let video;
    return {
      playerHolder: {
        set: vid => (video = vid),
        get: () => video
      }
    };
  },
  components: {
    VideoPlayer,
    Notes
  },
  computed: {
    videoUrl: function() {
      return this.$route.params["slug"];
    }
  },
  methods: {
    addNote() {
      const video = this.$store.getters.video(this.videoUrl);
      this.$store.commit("addNote", {
        video,
        time: this.playerHolder.get().currentTime()
      });
    }
  }
};
</script>
<style scoped>
.video-details {
  display: grid;
  grid-gap: 1rem;
  justify-items: center;
}

.video {
  grid-area: video;
}

.notes {
  grid-area: notes;
  padding-left: 0;
}

.add-note {
  grid-area: add-btn;
  max-height: 3rem;
  align-self: start;
}

@media (min-width: 20rem) {
  .video-details {
    grid-template-areas:
      "video"
      "add-btn"
      "notes";
  }
}

@media (min-width: 40rem) {
  .video {
    width: 30rem;
    height: 18rem;
  }
}
@media (min-width: 62rem) {
  .video-details {
    grid-template-areas:
      "video video notes"
      "add-btn add-btn notes"
      ". . notes";
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 4rem;
  }
  .video {
    width: 42rem;
    height: 28rem;
  }
}
@media (min-width: 100rem) {
  .video {
    width: 60rem;
    height: 40rem;
  }
}
</style>
