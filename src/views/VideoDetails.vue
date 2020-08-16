<template>
  <div class="details">
    <div class="details__top-controls">
      <div v-if="notStarted">
        <base-button mute disabled class="details__add-note--disabled">Add note</base-button>
      </div>
      <div v-else>
        <base-button primary @click.native="addNote">Add note</base-button>
      </div>
    </div>
    <div
      class="details__main"
      :class="[notesSize > 0 ? 'details__with-notes' : 'details__with-no-notes']"
    >
      <video-player
        v-if="show"
        :url="videoUrl"
        :playerHolder="playerHolder"
        class="details__video"
      />
      <notes :url="videoUrl" class="details__notes" :playerHolder="playerHolder" />
    </div>
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
        set: (vid) => (video = vid),
        get: () => video,
        notify: (e) => {
          if (e === "firstplay") {
            this.notStarted = false;
          }
        },
      },
      notStarted: true,
      show: true,
    };
  },
  components: {
    VideoPlayer,
    Notes,
  },
  computed: {
    videoUrl: function () {
      return this.$route.params["slug"];
    },
    notesSize: function () {
      const video = this.$store.getters.video(this.videoUrl);
      return video.notes.length;
    },
  },
  methods: {
    addNote() {
      const video = this.$store.getters.video(this.videoUrl);

      this.$store.commit("addNote", {
        video,
        time: this.playerHolder.get().currentTime(),
        duration: this.playerHolder.get().duration(),
      });
    },
  },
};
</script>
<style scoped>
.details {
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  grid-gap: 1rem;
}

.details__top-controls {
  display: flex;
  justify-content: center;
}

.details__main {
  display: grid;
}

.details__with-notes .details__notes {
  margin: 1rem;
}

.details__with-no-notes {
  display: flex;
  justify-content: center;
}

.details__video {
  width: 100%;
  height: 18rem;
}

.details__add-note--disabled {
  cursor: not-allowed;
  top: 0;
}

@media (min-width: 46rem) {
  .details__video {
    height: 25rem;
  }
}

@media (min-width: 60rem) {
  .details__video {
    width: 52rem;
    height: 32rem;
  }
}

@media (min-width: 78rem) {
  .note {
    width: 26rem;
  }

  .details__video {
    width: 45rem;
    height: 28rem;
  }

  .details__main {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 2rem;
  }
}
</style>
