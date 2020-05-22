<template>
  <div class="note">
    <div class="top-controls">
      <button @click="play" class="play-btn">play</button>
      <button v-if="mode === 'showing'" @click="edit" class="edit-btn">edit</button>
      <button @click="deleteNote" class="delete-btn">delete</button>
    </div>
    <div class="timestamp">{{ formatTimestamp(note.time) }}/{{formatTimestamp(note.duration)}}</div>
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
    },
    duration: {
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
    },
    formatTimestamp: function(time) {
      const dateObj = new Date(time * 1000);
      const minutes = dateObj.getUTCMinutes();
      const seconds = dateObj.getSeconds();
      return (
        minutes.toString().padStart(2, "0") +
        ":" +
        seconds.toString().padStart(2, "0")
      );
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
  grid-gap: 1rem;
  border-bottom: 1px solid #70003a;
  margin-bottom: 1rem;
}

.top-controls {
  grid-area: top-controls;
}

.bottom-controls {
  grid-area: bottom-controls;
}

.timestamp {
  grid-area: time;
  font-size: 0.9rem;
}

.content,
.text {
  grid-area: content;
}

.content p {
  text-align: left;
  overflow-x: auto;
  max-height: 15rem;
  white-space: pre-wrap;
}

.text > textarea {
  width: 20rem;
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

/* custom scrollbar */
::-webkit-scrollbar {
  width: 12px;
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
  background: #e8569f;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
}
::-webkit-scrollbar-thumb:window-inactive {
  background: #e8569f;
}
</style>