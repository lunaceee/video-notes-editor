<template>
  <div class="note">
    <div class="top-controls">
      <button @click="play" class="play-btn">play</button>
      <button v-if="mode === 'showing'" @click="edit" class="edit-btn">edit</button>
      <button @click="deleteNote" class="delete-btn">delete</button>
    </div>
    <div class="timestamp">
      <p>{{ Math.floor(note.time) }}s</p>
    </div>
    <div class="content">
      <p v-if="mode === 'showing'">{{note.text}}</p>
    </div>
    <div class="text">
      <textarea
        wrap="hard"
        v-if="mode === 'editing'"
        :placeholder="placeholder"
        v-model="editingContent"
      ></textarea>
    </div>
    <div class="bottom-controls">
      <button v-if="mode === 'editing'" @click="save" class="save-btn">save</button>
      <button v-if="mode === 'editing'" @click="cancel" class="cancel-btn">cancel</button>
    </div>
  </div>
</template>
<script>
import { bus } from "../main";

export default {
  name: "note",
  data() {
    return {
      mode: "showing",
      editingContent: this.note.text
    };
  },
  props: {
    placeholder: {
      default: "Type in note",
      type: String
    },
    playerHolder: {
      type: Object
    },
    video: {
      default: () => {},
      type: Object
    },
    note: {
      default: () => {},
      type: Object
    },
    noteIndex: {
      default: 0,
      type: Number
    }
  },
  methods: {
    edit: function() {
      this.editingContent = this.note.text;
      this.mode = "editing";
    },
    cancel: function() {
      this.mode = "showing";
    },
    save: function() {
      this.$store.commit("updateNote", {
        note: this.note,
        text: this.editingContent
      });
      this.mode = "showing";
    },
    deleteNote: function() {
      this.$store.commit("deleteNote", {
        video: this.video,
        noteIndex: this.noteIndex
      });
    },
    play: function() {
      const player = this.playerHolder.get();
      player.pause();
      player.currentTime(this.note.time);
      player.play();
    }
  }
};
</script>
<style scoped>
.note {
  display: grid;
  grid-template-areas:
    "top-controls time"
    "content content"
    "bottom-controls bottom-controls";
  justify-items: start;
  align-items: center;
  width: 20rem;
  grid-gap: 1rem;
  border-bottom: 1px solid #0d0904;
}

.top-controls {
  grid-area: top-controls;
}

.bottom-controls {
  grid-area: bottom-controls;
}

.timestamp {
  grid-area: time;
  font-weight: 600;
}

.content,
.text {
  width: 20rem;
  grid-area: content;
}

.content {
  text-align: left;
  overflow: scroll;
  max-height: 15rem;
}

.text > textarea {
  width: 18rem;
  height: 8rem;
}

.play-btn {
  grid-area: play;
}
.edit-btn {
  grid-area: edit;
}
.delete-btn {
  grid-area: delete;
}

button:active {
  top: 0.1em;
}

.cancel-btn {
  background-color: #faeff1;
  color: #2e2525;
}

.delete-btn {
  background-color: #70003a;
}

.save-btn {
  background-color: #3cb87d;
}
</style>