<template>
  <div>
    <button v-on:click="addNote">
      Add note
    </button>

    <ul>
      <li v-for="(note, index) in notes" :key="index">
        <Note :note="note" />
      </li>
    </ul>
  </div>
</template>
<script>
import { bus } from "../main";
import Note from "./Note.vue";

export default {
  name: "Notes",
  components: {
    Note,
  },
  props: {
    url: { type: String, required: true },
  },
  computed: {
    notes() {
      const video = this.$store.getters.video(this.url);
      return video.notes;
    },
  },
  methods: {
    addNote() {
      const video = this.$store.getters.video(this.url);
      this.$store.commit('addNote', video);
    }
  }
};
</script>
<style>
li {
  list-style: none;
}

.hidden {
  display: none;
}

.active {
  display: inline-block;
}
</style>
