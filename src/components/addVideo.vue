<template>
  <form
    class="flex justify-center flex-col sm:flex-row"
    @submit.prevent="onSubmit"
    id="addVideo"
  >
    <input
      class="sm:w-2/3 w-full my-2 sm:mx-4 sm:my-0 h-10 placeholder-gray-500 border rounded px-2 focus:outline-none focus:shadow-outline"
      type="text"
      placeholder="Paste in a video URL..."
    />
    <base-button variant="RED" class="w-full sm:w-1/5"> add video </base-button>
  </form>
</template>
<script>
export default {
  name: "addVideo",
  methods: {
    onSubmit(e) {
      const newUrl = e.target[0].value || "";
      if (newUrl) {
        this.$store.dispatch("addVideo", { newUrl });
        document.getElementById("addVideo").reset();
      } else {
        alert("Please insert a URL");
      }
    },
  },
};
</script>