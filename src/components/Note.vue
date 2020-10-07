<template>
  <div class="flex flex-col border-b-2 border-red-600 mb-8">
    <div class="flex flex-row justify-between">
      <button @click="togglePlay" class="flex content-center">
        <IconPlay v-show="!isPlaying" class="hover:text-red-400" />
        <IconPause v-show="isPlaying" />
        <span class="text-red-500 hover:text-red-400 mx-1">{{
          formatTimestamp(note.time)
        }}</span>
      </button>
      <div>
        <button v-if="mode === 'showing'" @click="edit" class="px-2">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="stroke-current stroke-2 text-red-500 inline-block h-6 w-6"
          >
            <path
              d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
            />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        </button>
        <button @click="deleteNote">
          <IconTrash class="hover:text-red-400" />
        </button>
      </div>
    </div>
    <article
      class="py-4 break-all whitespace-pre-wrap overflow-auto"
      v-if="mode === 'showing'"
    >
      {{ note.text }}
    </article>
    <textarea
      v-on:change="onChangeNote"
      v-on:keyup="onChangeNote"
      v-if="mode === 'editing'"
      :placeholder="placeholder"
      v-model="editingContent"
      class="w-full h-64 p-4 my-8 border-2 rounded focus:outline-none focus:border-red-500"
    ></textarea>
    <div class="flex justify-between mb-4">
      <base-button
        variant="RED"
        @click.native="save"
        v-if="mode === 'editing'"
        class="w-1/3"
        :disabled="!isChanged"
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
import IconPause from "@/assets/icons/IconPause.svg";

export default {
  name: "videoNote",
  data() {
    return {
      mode: "showing",
      editingContent: this.note.text,
      isPlaying: false,
      isChanged: false,
    };
  },
  components: {
    IconPlay,
    IconEdit,
    IconTrash,
    IconPause,
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
      this.isChanged = false;
    },
    cancel: function () {
      this.mode = "showing";
    },
    onChangeNote: function () {
      this.isChanged = true;
    },
    save: function () {
      this.$store.commit("updateNote", {
        note: this.note,
        text: this.editingContent,
      });
      this.mode = "showing";
    },
    togglePlay: function () {
      const player = this.playerHolder.get();

      if (this.isPlaying) {
        player.pause();
        this.isPlaying = false;
      } else {
        this.isPlaying = true;
        player.pause();
        player.currentTime(this.note.time);
        player.play();
      }
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
