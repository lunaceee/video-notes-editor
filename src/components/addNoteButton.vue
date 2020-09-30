<template>
  <div>
    <div v-if="!clickedPlay">
      <base-button variant="GRAY" class="w-full cursor-not-allowed">
        add note
      </base-button>
    </div>
    <div v-else>
      <base-button @click.native="addNote" variant="RED" class="w-full">
        add note
      </base-button>
    </div>
  </div>
</template>
<script>
export default {
  name: "addNoteButton",
  props: {
    playerHolder: {
      type: Object,
    },
    url: {
      type: String,
    },
    video: {
      type: Object,
    },
    addNote: {
      type: Function,
    },
    clickedPlay: {
      type: Boolean,
    },
  },
};
</script>