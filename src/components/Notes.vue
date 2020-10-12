<template>
  <div v-if="notes.length > 0">
    <h1 class="p-2 text-center">Notes ({{ notes.length }})</h1>
    <ul
      class="h-64 lg:h-vhmd overflow-y-scroll border-2 border-gray-800 border-dotted rounded p-4"
    >
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
  </div>
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
