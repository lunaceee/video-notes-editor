<template>
  <div class="fff">
    <button>wwwww</button>
  </div>
</template>

<script>
import youtube from "videojs-youtube";

export default {
  name: "YouTube",
  props: {
    options: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      foo: null,
    };
  },

  mounted() {
    this.player = () => {
      console.log(youtube);
      console.log("xxx", this);
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
