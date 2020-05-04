<template>
  <div>
    <button v-on:click="addNote">
      Add note
    </button>

    <ul>
      <li v-for="(note, index) in notes" :key="index">
        <Note :note="note" :noteIndex="index" :video="video" :playerHolder="playerHolder" />
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
  methods: {
    addNote() {
      const video = this.$store.getters.video(this.url);
      this.$store.commit('addNote', {video, time: this.playerHolder.get().currentTime()});
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
