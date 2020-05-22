<template>
  <div class="video-details" :class="notesSize > 0 ? 'withSidebar' : 'withNoSidebar'">
    <div class="top-controls">
      <GoBack />
      <button v-on:click="addNote" class="add-note">Add note</button>
    </div>
    <video-player
      :url="videoUrl"
      :playerHolder="playerHolder"
      :class="videoUrl !== '/' ? 'video' : ''"
    />
    <notes :url="videoUrl" class="notes" :playerHolder="playerHolder" />
  </div>
</template>
<script>
import VideoPlayer from "@/components/VideoPlayer.vue";
import GoBack from "@/components/GoBack.vue";

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
    Notes,
    GoBack
  },
  computed: {
    videoUrl: function() {
      return this.$route.params["slug"];
    },
    notesSize: function() {
      const video = this.$store.getters.video(this.videoUrl);
      return video.notes.length;
    }
  },
  methods: {
    addNote() {
      const video = this.$store.getters.video(this.videoUrl);

      this.$store.commit("addNote", {
        video,
        time: this.playerHolder.get().currentTime(),
        duration: this.playerHolder.get().duration()
      });
    }
  }
};
</script>
<style scoped>
.video-details {
  display: grid;
  justify-items: center;
}

.video {
  grid-area: video;
}

.notes {
  grid-area: notes;
  padding-left: 0;
}

.top-controls {
  grid-area: top-controls;
}

@media (min-width: 20rem) {
  .video-details {
    grid-template-areas:
      "top-controls"
      "video"
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
  .withSidebar {
    grid-template-areas:
      "top-controls top-controls ."
      "video video notes"
      ". . notes";
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1rem 4rem;
  }

  .withNoSidebar {
    grid-template-areas:
      "top-controls top-controls"
      "video video";
    grid-template-columns: repeat(2, 2fr);
    grid-gap: 1rem;
  }

  .video {
    width: 43rem;
    height: 28rem;
  }
}
@media (min-width: 100rem) {
  .video {
    width: 56rem;
    height: 33rem;
  }
}
</style>
