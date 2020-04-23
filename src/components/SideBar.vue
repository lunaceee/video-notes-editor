<template>
  <div class="sidebar">
    {{ notes }}
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
