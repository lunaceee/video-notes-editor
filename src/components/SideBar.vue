<template>
  <div class="sidebar">
    <li v-for="note in notes" :key="note">
      <ul>
        <li v-for="time in note" :key="time">
          {{ time }}
        </li>
      </ul>
    </li>
  </div></template
>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["notes"]),
  },
};
</script>
<style>
li {
  list-style: none;
}
</style>
