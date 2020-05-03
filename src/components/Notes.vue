<template>
  <ul>
    <li v-for="(note, time, index) in getNote" :key="index">
      <Note />
    </li>
  </ul>
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
    placeholder: {
      default: "Type in note",
      type: String,
    },
    newNote: {
      type: String,
    },
    savedNote: {
      default: "",
      type: String,
    },
  },
  data() {
    return {
      startTime: {
        type: Number,
      },
      activeItem: null,
      editingObj: {},
    };
  },
  computed: {
    getNote() {
      console.log("getNote computed", this.$store.getters.getNote(this.url));
      return this.$store.getters.getNote(this.url);
    },
  },
  methods: {
    isEditing: function(time) {
      console.log("dfdfdfh", this.editingObj[time]);
      return this.editingObj[time];
    },
    expandNote: function(time) {
      this.editingObj[time] = true;
      console.log("xxxx", this.editingObj[time]);
    },
    collapseNote: function() {
      console.log("collapsed");
      this.activeItem = null;
    },
    setStartTime: function(time) {
      this.startTime = time;
      bus.$emit("setStartTime", time);
    },
    saveNote: function(time, e) {
      console.log(arguments, e);
      console.log(document.getElementById(`textarea-${e.target.id}`));
      let tarea = document.getElementById(`textarea-${e.target.id}`);

      let note = tarea.value;
      this.$store.commit("editNote", [note, time, this.url]);
    },
  },
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
