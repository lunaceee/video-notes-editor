<template>
  <div class="note">
    <div class="controls">
    <button @click="play">play</button>
    <button v-if="mode === 'showing'" @click="edit">edit</button>
    <button v-if="mode === 'editing'" @click="save">save</button>
    <button v-if="mode === 'editing'" @click="cancel">cancel</button>
    <button @click="deleteNote">delete</button>
    </div>
    <div class="content">
      <p v-if="mode === 'showing'">
        {{note.time}} {{note.text}}
      </p>   
      <textarea v-if="mode === 'editing'" :placeholder="placeholder" v-model="editingContent"></textarea>
    </div>
  </div>
</template>
<script>
import { bus } from "../main";

export default {
  name: "note",
  data() {
    return {
      mode: 'showing',
      editingContent: this.note.text
    }
  },
  props: {
    placeholder: {
      default: "Type in note",
      type: String,
    },
    playerHolder: {
      type: Object
    },
    video: {
      default: () => {},
      type: Object
    },
    note: {
      default: () => {},
      type: Object
    },
    noteIndex: {
      default: 0,
      type: Number,
    }
  },
  methods: {
    edit: function(){
      this.editingContent = this.note.text;
      this.mode = "editing"
    },
    cancel: function(){
      this.mode = "showing"
    },
    save: function() {
      this.$store.commit("updateNote", {note: this.note, text: this.editingContent});
      this.mode = "showing";
    },
    deleteNote: function() {
      this.$store.commit("deleteNote", {video: this.video, noteIndex: this.noteIndex})
    },
    play: function(){
      const player = this.playerHolder.get();
      player.pause();
      player.currentTime(this.note.time);
      player.play();
    }
  },
};
</script>
<style>
  .note {
    margin: 1rem;
    outline: 1px solid gray;
    padding: 1rem;
    max-width: 30rem;
  }
  .controls button {
    display: inline-block;
    margin: .5rem;
  }
  .content p {
    outline: 1px solid rgba(0, 0, 0, 0.1);
  }
  .content textarea {
    width: 100%;
    min-height: 4rem;
  }
</style>