<template>
  <ul>
    <li v-for="(note, index) in notes" :key="index">
      <Note :note="note" :noteIndex="index" :video="video" :playerHolder="playerHolder" />
    </li>
  </ul>
</template>
<script>
import { bus } from "../main";
import Note from "./Note.vue";

export default {
  name: "videoNotes",
  components: {
    Note,
  },
  props: {
    url: { type: String, required: true },
    playerHolder: { type: Object },
  },
  computed: {
    video() {
      return this.$store.getters.video(this.url);
    },
    notes() {
      const video = this.$store.getters.video(this.url);
      return video.notes;
    },
  },
};
</script>
<style scoped>
.hidden {
  display: none;
}

.active {
  display: inline-block;
}
</style>
