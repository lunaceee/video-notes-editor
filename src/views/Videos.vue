<template>
  <ul class="videos">
    <li v-for="(video, index) in videos" :key="index" class="video-thumbnail">
      <figure>
        <router-link
          :to="{
              name: 'VideoDetails',
              params: { slug: video.url },
            }"
        >
          <img :src="getVideoThumbnail(video.url)" :url="video.url" alt="video thumbnail" />
        </router-link>
      </figure>
      <button class="delete-btn" @click="deleteVideo(video.videoId)">delete</button>
    </li>
  </ul>
</template>

<script>
import { mapState } from "vuex";
import { getVideoId } from "../utils";

export default {
  name: "Videos",
  computed: {
    ...mapState(["videos"])
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
    }
  }
};
</script>
<style scoped>
.videos {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(26rem, 1fr));
  padding: 0;
}

li {
  list-style: none;
  display: inline;
}

.video-thumbnail img {
  width: 20rem;
  height: auto;
}

.video-thumbnail figure {
  padding: 1rem;
}

.video-thumbnail figure:hover {
  background-color: var(--video-overlay);
  transition: cubic-bezier(0.075, 0.82, 0.165, 1) 0.5s;
}

.delete-btn {
  background-color: var(--btn-delete-bg);
  cursor: pointer;
}
</style>