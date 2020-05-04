<template>
  <div class="note">
    <div class="controls">
    <button>play</button>
    <button v-if="mode === 'showing'" @click="edit">edit</button>
    <button v-if="mode === 'editing'">save</button>
    <button v-if="mode === 'editing'" @click="show">cancel</button>
    <button>delete</button>
    </div>
    <div class="content">
      <p v-if="mode === 'showing'">
        {{note.time}} {{note.text}}
      </p>   
      <textarea v-if="mode === 'editing'" :placeholder="placeholder"></textarea>
    </div>
  </div>
</template>
<script>
import { bus } from "../main";

export default {
  name: "note",
  data() {
    return {
      mode: 'showing'
    }
  },
  props: {
    placeholder: {
      default: "Type in note",
      type: String,
    },
    note: {
      default: () => {},
      type: Object
    }
  },
  computed: {

  },
  methods: {
    edit: function(){
      this.mode = "editing"
    },
    show: function(){
      this.mode = "showing"
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
  .content  {
    background-color: rgba(0, 0, 0, 0.1);
  }
  .content text {
    width: 100%;
    min-height: 4rem;
  }
</style>