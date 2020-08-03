<template>
  <ul class="videos">
    <li v-for="(video, index) in videos" :key="index">
      <card>
        <template v-slot:media>
          <router-link
            :to="{
              name: 'VideoDetails',
              params: { slug: video.url },
            }"
          >
            <img
              class="media__image"
              :src="getVideoThumbnail(video.url)"
              :url="video.url"
              alt="video thumbnail"
            />
          </router-link>
        </template>
        <template v-slot:card-title>This is a title</template>

        <template v-slot:footer>
          <base-button danger @click.native="deleteVideo(video.videoId)">delete</base-button>
        </template>
      </card>
    </li>
  </ul>
</template>

<script>
import { mapState } from "vuex";
import { getVideoId } from "../utils";

export default {
  name: "VideosList",
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
<style scoped>
.videos {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(22rem, 1fr));
  grid-gap: 4rem;
  margin-top: 3rem;
}

.media__image {
  transition: all 0.5s ease-in-out;
  width: 100%;
}

.media__image:hover {
  transform: scale(1.1);
}
</style>