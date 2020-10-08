<template>
  <ul
    class="my-8 mx-4 grid gap-8 grid-flow-row sm:grid-flow-col sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
  >
    <li v-for="(video, index) in videos" :key="index">
      <router-link
        :to="{
          name: 'VideoDetails',
          params: { slug: video.url },
        }"
      >
        <div
          class="grid grid-flow-column bg-white border rounded-lg overflow-hidden hover:shadow-md transition duration-300 ease-in-out"
        >
          <div class="overflow-hidden h-56 md:h-32 lg:h-64">
            <img
              class="w-full h-64 md:h-40 lg:h-56 hover:opacity-75 transition duration-300 ease-in-out"
              :src="getVideoThumbnail(video.url)"
              :url="video.url"
              alt="video thumbnail"
            />
          </div>
          <div class="p-4 md:h-56">
            <h3 class="lg:-mt-5 md:h-32 lg:h-40 overflow-hidden break-all">
              {{ video.videoTitle }}
            </h3>
            <div class="p-2">
              <base-button
                variant="DARKRED"
                class="w-full md:w-3/5 lg:w-2/5"
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
      } else if (url.match(/vimeo\.com/)) {
        return `https://i.vimeocdn.com/video/${videoId}_640.webp`;
      }
    },
    deleteVideo(videoId) {
      this.$store.commit("deleteVideo", videoId);
    },
  },
};
</script>