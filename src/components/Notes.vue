<template>
  <ul>
    <li v-for="time in getNote" :key="time.toString()">
      <div>
        <button :time="time" @click="setStartTime(time)">Play</button>
        <button @click="expandNote(time)">
          Edit
        </button>
        <div
          :class="{
            active: activeItem === time,
            hidden: activeItem !== time,
          }"
        >
          <textarea></textarea>
          <button disabled>Save</button>
          <button @click="collapseNote">
            Cancel
          </button>
        </div>
      </div>
    </li>
  </ul>
</template>
<script>
import { bus } from "../main";

export default {
  name: "Notes",
  data() {
    return {
      startTime: {
        type: Number,
      },
      activeItem: null,
    };
  },
  props: {
    url: { type: String, required: true },
  },
  computed: {
    getNote() {
      return this.$store.getters.getNote(this.url);
    },
  },
  methods: {
    expandNote: function(time) {
      this.activeItem = time;
    },
    collapseNote: function() {
      console.log("collapsed");
      this.activeItem = null;
    },
    setStartTime: function(time) {
      this.startTime = time;
      bus.$emit("setStartTime", time);
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
