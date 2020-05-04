<template>
  <div>
    <GoBack />
    <notes :url="videoUrl" class="notes" :playerHolder="playerHolder" />
    <video-player :url="videoUrl" class="player" :playerHolder="playerHolder" />
  </div>
</template>
<script>
import VideoPlayer from "@/components/VideoPlayer.vue";
import GoBack from "@/components/GoBack";
import Notes from "@/components/Notes.vue";
import { mapGetters } from "vuex";

export default {
  name: "VideoDetails",
  data() {
    let video;
    return {
      playerHolder: {
        set: (vid) => video = vid,
        get: () => video,
      }
    };
  },
  components: {
    VideoPlayer,
    Notes,
    GoBack,
  },
  computed: {
    videoUrl: function() {
      return this.$route.params["slug"];
    },
  },
};
</script>
<style>
.player {
  float: left;
}
.notes {
  float: right;
}
</style>
