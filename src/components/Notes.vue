<template>
  <ul>
    <li v-for="(note, index) in notes" :key="index">
      <Note
        :note="note"
        :noteIndex="index"
        :playNote="playNote"
        :pauseAll="pauseAll"
        :video="video"
      />
    </li>
  </ul>
</template>
<script>
import Note from "./Note.vue";

export default {
  name: "videoNotes",
  components: {
    Note,
  },
  props: {
    url: { type: String, required: true },
    playNote: { type: Function },
    pauseAll: { type: Function },
  },
  computed: {
    video() {
      return this.$store.getters.video(this.url);
    },
    notes() {
      const video = this.$store.getters.video(this.url);
      let copyofNotes = [...video.notes];
      return copyofNotes.reverse();
    },
  },
};
</script>
