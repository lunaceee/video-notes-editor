<template>
  <div>
    <video-player :url="myUrl" />
    <notes :url="myUrl" />
  </div>
</template>
<script>
import VideoPlayer from "@/components/VideoPlayer.vue";
import Notes from "@/components/Notes.vue";
import { mapGetters } from "vuex";

export default {
  name: "VideoDetails",
  components: {
    VideoPlayer,
    Notes,
  },
  computed: {
    ...mapGetters(["notes"]),
    myUrl: function() {
      return this.$route.params["slug"];
    },
  },
};
</script>
