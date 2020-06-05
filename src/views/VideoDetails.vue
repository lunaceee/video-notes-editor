<template>
  <div class="video-details" :class="notesSize > 0 ? 'with-notes' : 'with-no-notes'">
    <div class="top-controls">
      <button :disabled="notStarted" v-on:click="addNote" class="add-note">Add note</button>
    </div>
    <transition name="slide-fade">
      <video-player v-if="show" :url="videoUrl" :playerHolder="playerHolder" class="video" />
    </transition>
    <notes :url="videoUrl" class="notes" :playerHolder="playerHolder" />
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
        get: () => video,
        notify: e => {
          if (e === "firstplay") {
            console.log("notify");
            this.notStarted = false;
          }
        }
      },
      notStarted: true,
      show: true
    };
  },
  components: {
    VideoPlayer,
    Notes
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
  margin-bottom: 5rem;
}

.add-note[disabled="disabled"] {
  background-color: var(--btn-mute-bg);
  cursor: not-allowed;
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
    grid-gap: 1rem;
  }

  .notes {
    width: 80vw;
  }
}

@media (min-width: 48rem) {
  .video {
    width: 80vw;
    height: 28rem;
  }

  .notes {
    width: 80vw;
  }
}
@media (min-width: 65rem) {
  .video-details,
  .with-notes {
    grid-template-areas:
      "top-controls top-controls ."
      "video video notes";
  }

  .with-no-notes {
    grid-template-areas:
      "top-controls"
      "video";
  }

  .with-no-notes > .notes {
    display: none;
  }

  .video {
    width: 80vw;
    height: 28rem;
  }

  .notes {
    width: 80vw;
  }
}

@media (min-width: 80rem) {
  .video {
    width: 42rem;
    height: 28rem;
  }

  .notes {
    width: 20rem;
  }
}

@media (min-width: 100rem) {
  .video {
    width: 56rem;
    height: 33rem;
  }
}
</style>
