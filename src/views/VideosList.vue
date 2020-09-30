<template>
  <ul
    class="my-8 mx-4 grid gap-8 grid-flow-row sm:grid-flow-col sm:grid-cols-2 md:grid-cols-3 justify-items-center"
  >
    <li v-for="(video, index) in videos" :key="index">
      <router-link
        :to="{
          name: 'VideoDetails',
          params: { slug: video.url },
        }"
      >
        <div
          class="max-w-sm bg-white border rounded-lg overflow-hidden hover:shadow-md transition duration-300 ease-in-out"
        >
          <img
            class="w-full hover:opacity-75 transition duration-300 ease-in-out"
            :src="getVideoThumbnail(video.url)"
            :url="video.url"
            alt="video thumbnail"
          />
          <div class="p-4">
            <h3 class="mb-2">
              {{ video.videoTitle }}
            </h3>
            <div class="p-2">
              <base-button
                variant="DARKRED"
                class="w-2/5"
                @click.native.prevent="deleteVideo(video.videoId)"
              >
                delete
              </base-button>
            </div>
          </div>
        </div>
      </router-link>
    </li>
  </ul>
</template>

<script>
import { mapState } from "vuex";
import { getVideoId } from "../utils";

export default {
  name: "VideosList",
  data() {
    return { showByIndex: null };
  },
  computed: {
    ...mapState(["videos"]),
  },
  methods: {
    getVideoThumbnail(url) {
      const videoId = getVideoId(url);
      if (url.match(/youtu\.be/) || url.match(/v=/)) {
        return `https://img.youtube.com/vi/${videoId}/0.jpg`;
      }
      return `https://img.youtube.com/vi/eYLbteOm42k/0.jpg`; // Placeholder for non YouTube videos
    },
    deleteVideo(videoId) {
      this.$store.commit("deleteVideo", videoId);
    },
  },
};
</script>