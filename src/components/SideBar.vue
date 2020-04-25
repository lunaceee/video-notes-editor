<template>
  <div class="sidebar">
    <li v-for="note in notes" :key="note">
      <ul>
        <li v-for="value in note" :key="value.toString()">
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
              <div>
                <textarea></textarea>
                <button disabled>Save</button>
                <button @click="collapseNote">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </li>
  </div></template
>
<script>
import { mapGetters } from "vuex";
import { bus } from "../main";

export default {
  name: "SideBar",
  data() {
    return {
      startTime: {
        type: Number,
      },
      activeItem: null,
    };
  },
  computed: {
    ...mapGetters(["notes"]),
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
