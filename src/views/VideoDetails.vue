<template>
  <div
    class="grid grid-flow-row lg:grid-flow-col gap-8"
    :class="[notesSize === 0 ? 'lg:grid-cols-1' : 'lg:grid-cols-3']"
  >
    <video-player
      class="grid lg:col-span-2 gap-y-2"
      :url="videoUrl"
      :playerHolder="playerHolder"
    />
    <notes :url="videoUrl" :playerHolder="playerHolder" class="p-2" />
  </div>
</template>
<script>
import VideoPlayer from "@/components/VideoPlayer.vue";
import Notes from "@/components/Notes.vue";

export default {
  name: "VideoDetails",
  data() {
    let video;
    return {
      playerHolder: {
        set: (vid) => (video = vid),
        get: () => video,
        notify: (e) => {
          if (e === "firstplay") {
            this.clickedPlay = true;
          }
        },
      },
    };
  },
  components: {
    VideoPlayer,
    Notes,
  },
  computed: {
    videoUrl: function () {
      return this.$route.params["slug"];
    },
    notesSize: function () {
      const video = this.$store.getters.video(this.videoUrl);
      return video.notes.length;
    },
  },
};
</script>
