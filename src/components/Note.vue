<template>
  <div class="note">
    <div class="note__top-controls">
      <button @click="play" class="btn__icon icon-group__play">
        <IconPlay />
        <span class="note__timestamp">{{ formatTimestamp(note.time) }}</span>
      </button>
      <div class="icon-group__edit">
        <button class="btn__icon" v-if="mode === 'showing'" @click="edit">
          <IconEdit />
        </button>
        <button class="btn__icon" @click="deleteNote">
          <IconTrash />
        </button>
      </div>
    </div>
    <div class="note__content">
      <p v-if="mode === 'showing'">{{note.text}}</p>
    </div>
    <div class="note__input">
      <textarea
        wrap="hard"
        v-if="mode === 'editing'"
        :placeholder="placeholder"
        v-model="editingContent"
      ></textarea>
    </div>
    <div class="note__bottom-controls">
      <base-button @click.native="save" v-if="mode === 'editing'" primary>Save</base-button>
      <base-button @click.native="cancel" v-if="mode === 'editing'" cancel>Cancel</base-button>
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
<style scoped>
.note {
  display: grid;
  grid-template-areas:
    "top-controls"
    "content"
    "bottom-controls";
  border-bottom: 1px solid var(--border);
  margin-bottom: 1rem;
}

.note__top-controls {
  grid-area: top-controls;
  display: flex;
  justify-content: space-between;
}

.note__timestamp {
  font-weight: 600;
  align-self: center;
  margin-left: 0.3rem;
  color: var(--dark-blue);
}

.note__timestamp:hover {
  color: var(--light-red);
}

.icon-group__play {
  display: flex;
  justify-content: flex-start;
  align-self: center;
}

.icon-group__edit {
  display: flex;
  justify-content: flex-end;
}

.note__bottom-controls {
  grid-area: bottom-controls;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
}

.note__content,
.note__input {
  grid-area: content;
  width: inherit;
  margin: 0 0.5rem;
}

.note__input {
  display: flex;
  justify-items: center;
}

.note__content > p {
  overflow-x: auto;
  max-height: 10rem;
  white-space: pre-wrap;
  word-wrap: break-word;
  word-break: break-all;
  padding: 0 2rem 0 0;
}

textarea {
  width: 100%;
  max-width: 100%;
  height: 15rem;
  border: 1px solid var(--border);
  border-radius: 4px;
  margin: 2rem 0;
  padding: 1rem;
}

textarea:invalid {
  border: 2px solid var(--btn-delete-bg);
}

textarea::placeholder {
  color: var(--dark-blue);
}

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