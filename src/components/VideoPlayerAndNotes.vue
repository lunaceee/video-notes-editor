<template>
  <div>
    <ul v-for="url in Object.keys(notes)" :key="url">
      <li>
        <video-player :url="url" />
        <notes :url="url" />
      </li>
    </ul>
  </div>
</template>
<script>
import VideoPlayer from "@/components/VideoPlayer.vue";
import Notes from "@/components/Notes.vue";
import { mapState } from "vuex";
import { mapGetters } from "vuex";

export default {
  name: "VideoPlayerAndNotes",
  components: {
    VideoPlayer,
    Notes,
  },
  computed: {
    ...mapState(["rawNotes"]),
    ...mapGetters(["notes"]),
  },
};
</script>
