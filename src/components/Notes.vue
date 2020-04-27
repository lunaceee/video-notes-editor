<template>
  <ul>
    <li v-for="value in getNote" :key="value.toString()">
      <div>
        <button :value="value" @click="setStartTime(value)">Play</button>
        <button @click="expandNote(value)">
          Edit
        </button>
        <div
          :class="{
            active: activeItem === value,
            hidden: activeItem !== value,
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
import { mapState } from "vuex";

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
  computed: mapState({
    notes: (state) => state.notes,
    getNote() {
      return this.$store.getters.getNote(this.url);
    },
  }),
  watch: {
    rawNotes(newVal, oldVal) {
      console.log("n", newVal, "o", oldVal);
    },
  },
  methods: {
    expandNote: function(value) {
      this.activeItem = value;
    },
    collapseNote: function() {
      console.log("collapsed");
      this.activeItem = null;
    },
    setStartTime: function(value) {
      this.startTime = value;
      bus.$emit("setStartTime", value);
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
