<template>
  <div class="details" :class="notesSize > 0 ? 'details__with-notes' : 'details__with-no-notes'">
    <div class="details__top-controls">
      <ButtonPrimary
        :disabled="notStarted"
        @click.native="addNote"
        class="details__add-note"
      >Add note</ButtonPrimary>
    </div>
    <video-player v-if="show" :url="videoUrl" :playerHolder="playerHolder" class="details__video" />
    <notes :url="videoUrl" class="details__notes" :playerHolder="playerHolder" />
  </div>
</template>
<script>
import VideoPlayer from "@/components/VideoPlayer.vue";

import Notes from "@/components/Notes.vue";
import { mapGetters } from "vuex";
import ButtonPrimary from "@/components/ButtonPrimary.vue";

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
    Notes,
    ButtonPrimary
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
.details {
  display: grid;
  justify-items: center;
}

.details__add-note[disabled="disabled"] {
  background-color: var(--btn-mute-bg);
  box-shadow: inset 0 -0.6em 0 -0.35em var(--btn-mute-color);
  color: var(--btn-mute-color);
  cursor: not-allowed;
  top: 0;
}

.details__video {
  grid-area: video;
}

.details__notes {
  grid-area: notes;
  padding: 0;
}

.details__top-controls {
  grid-area: top-controls;
  width: inherit;
}

@media (max-width: 20rem) {
  .details {
    display: flex;
    flex-direction: column;
  }

  .details__video {
    width: 100vw;
  }
}

@media (min-width: 20rem) {
  .details {
    grid-template-areas:
      "top-controls"
      "video"
      "notes";
    grid-gap: 1rem;
  }

  .details__video {
    width: 100vw;
    height: 16rem;
  }

  .details__notes {
    width: 80vw;
  }
}

@media (min-width: 30rem) {
  .details__video {
    height: 24rem;
  }
}

@media (min-width: 48rem) {
  .details__video {
    width: 80vw;
    height: 28rem;
  }
}

@media (min-width: 65rem) {
  .details {
    grid-template-areas:
      "top-controls top-controls ."
      "video video notes";
  }

  .details__with-no-notes {
    grid-template-areas:
      "top-controls"
      "video";
  }

  .details__with-no-notes > .details__notes {
    display: none;
  }

  .details__video {
    width: 40rem;
    height: 25rem;
  }

  .details__notes {
    width: 20rem;
  }
}

@media (min-width: 80rem) {
  .details__video {
    width: 43rem;
    height: 30rem;
  }

  .details__notes {
    width: 28rem;
  }
}

@media (min-width: 100rem) {
  .details__video {
    width: 56rem;
    height: 33rem;
  }
}
</style>
