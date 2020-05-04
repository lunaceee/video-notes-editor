<template>
  <div>
    <GoBack />
    <notes :url="videoUrl" class="notes" />
    <video-player :url="videoUrl" class="player" />
  </div>
</template>
<script>
import VideoPlayer from "@/components/VideoPlayer.vue";
import GoBack from "@/components/GoBack";
import Notes from "@/components/Notes.vue";
import { mapGetters } from "vuex";

export default {
  name: "VideoDetails",
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
</style>
