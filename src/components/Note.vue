<template>
  <div class="note">
    <div class="note__top-controls">
      <button @click="play" class="btn__icon icon-group__play">
        <base-icon icon-color="blue">
          <icon-play />
        </base-icon>
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
import IconTrash from "@/assets/icons/IconTrash.svg";
import BaseIcon from "@/components/BaseIcon.vue";
import IconPlay from "@/components/icons/IconPlay.vue";

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
    deleteNote: function () {
      this.$store.commit("deleteNote", {
        video: this.video,
        noteIndex: this.noteIndex,
      });
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
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: inherit;
}

.btn__icon:hover,
.icon-group__play:hover {
  color: var(--btn-primary-bg);
}

.note__timestamp {
  font-weight: 600;
  font-size: small;
  align-self: center;
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
}

.note__content,
.note__input {
  grid-area: content;
}

.note__content > p {
  text-align: left;
  overflow-x: auto;
  max-height: 15rem;
  white-space: pre-wrap;
  word-wrap: break-word;
  box-sizing: border-box;
  padding: 0 1rem;
}

textarea {
  width: 80%;
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
  color: var(--dark-brown);
}

/* custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

/* Track */
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  -webkit-border-radius: 10px;
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  -webkit-border-radius: 10px;
  border-radius: 10px;
  background: var(--btn-bg);
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
}
::-webkit-scrollbar-thumb:window-inactive {
  background: var(--btn-bg);
}

@media (min-width: 20rem) {
  .note__content {
    width: 80vw;
  }
}

@media (min-width: 65rem) {
  .note__content {
    width: 28rem;
  }

  .note__top-controls {
    width: 20rem;
  }
}

@media (min-width: 80rem) {
  .note__top-controls {
    width: 28rem;
  }
}
</style>