<template>
  <div class="flex flex-col border-b-2 border-teal-600 mb-8">
    <div class="flex flex-row justify-between">
      <button @click="play" class="flex">
        <IconPlay class="hover:text-red-500" />
        <span class="text-teal-500 hover:text-red-500 mx-1">{{
          formatTimestamp(note.time)
        }}</span>
      </button>
      <div>
        <button v-if="mode === 'showing'" @click="edit" class="px-2">
          <IconEdit class="hover:text-red-500" />
        </button>
        <button @click="deleteNote">
          <IconTrash class="hover:text-red-500" />
        </button>
      </div>
    </div>
    <p class="py-4" v-if="mode === 'showing'">{{ note.text }}</p>
    <textarea
      wrap="hard"
      v-if="mode === 'editing'"
      :placeholder="placeholder"
      v-model="editingContent"
      class="w-full h-64 p-4 my-8 border-2 rounded focus:outline-none focus:shadow-outline focus:border-teal-500"
    ></textarea>
    <div class="flex justify-between mb-4">
      <base-button
        variant="TEAL"
        @click.native="save"
        v-if="mode === 'editing'"
        class="w-1/3"
      >
        Save
      </base-button>
      <base-button
        variant="LIGHTGRAY"
        @click.native="cancel"
        v-if="mode === 'editing'"
        class="w-1/3"
      >
        Cancel
      </base-button>
    </div>
  </div>
</template>
<script>
import { bus } from "../main";
import IconEdit from "@/assets/icons/IconEdit.svg";
import IconPlay from "@/assets/icons/IconPlay.svg";
import IconTrash from "@/assets/icons/IconTrash.svg";

export default {
  name: "videoNote",
  data() {
    return {
      mode: "showing",
      editingContent: this.note.text,
    };
  },
  components: {
    IconPlay,
    IconEdit,
    IconTrash,
  },
  props: {
    placeholder: {
      default: "Curiosity nourishes the cat...",
      type: String,
    },
    playerHolder: {
      type: Object,
    },
    video: {
      default: () => {},
      type: Object,
    },
    note: {
      default: () => {},
      type: Object,
    },
    noteIndex: {
      default: 0,
      type: Number,
    },
    duration: {
      type: Number,
    },
  },
  methods: {
    edit: function () {
      this.editingContent = this.note.text;
      this.mode = "editing";
    },
    cancel: function () {
      this.mode = "showing";
    },
    save: function () {
      this.$store.commit("updateNote", {
        note: this.note,
        text: this.editingContent,
      });
      this.mode = "showing";
    },
    play: function () {
      const player = this.playerHolder.get();

      player.pause();
      player.currentTime(this.note.time);
      player.play();
    },
    formatTimestamp: function (time) {
      const dateObj = new Date(time * 1000);
      const minutes = dateObj.getUTCMinutes();
      const seconds = dateObj.getSeconds();
      return (
        minutes.toString().padStart(2, "0") +
        ":" +
        seconds.toString().padStart(2, "0")
      );
    },
    deleteNote: function () {
      this.$store.commit("deleteNote", {
        video: this.video,
        noteIndex: this.noteIndex,
      });
    },
  },
};
</script>
<style scoped lang="postcss">
/* custom scrollbar */
::-webkit-scrollbar {
  width: 0.5rem;
}

/* Track */
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  -webkit-border-radius: 0.5rem;
  border-radius: 0.5rem;
  margin-right: 0.2rem;
}

/* Handle */
::-webkit-scrollbar-thumb {
  -webkit-border-radius: 0.5rem;
  border-radius: 0.5rem;
  background: var(--light-blue);
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
}
::-webkit-scrollbar-thumb:window-inactive {
  background: var(--light-blue);
}
</style>