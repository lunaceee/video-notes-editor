<template>
  <ul class="videos">
    <li v-for="(video, index) in videos" :key="index">
      <figure class="video-thumbnail">
        <router-link
          :to="{
              name: 'VideoDetails',
              params: { slug: video.url },
            }"
        >
          <img :src="getVideoThumbnail(video.url)" :url="video.url" alt="video thumbnail" />
        </router-link>
      </figure>
      <ButtonPrimary class="btn__delete" @click.native="deleteVideo(video.videoId)">delete</ButtonPrimary>
    </li>
  </ul>
</template>

<script>
import { mapState } from "vuex";
import { getVideoId } from "../utils";
import ButtonPrimary from "@/components/ButtonPrimary.vue";

export default {
  name: "Videos",
  computed: {
    ...mapState(["videos"])
  },
  components: { ButtonPrimary },
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
  display: grid;
  justify-items: center;
}

.video-thumbnail {
  overflow: hidden;
}

.video-thumbnail img {
  -webkit-transition: all 0.5s ease;
  -moz-transition: all 0.5s ease;
  -ms-transition: all 0.5s ease;
  transition: all 0.5s ease;
}

.video-thumbnail img:hover {
  transform: rotate(2deg) scale(1.1);
}

.btn__delete {
  background-color: var(--btn-delete-bg);
  box-shadow: inset 0 -0.6em 0 -0.35em var(--btn-delete-border);
  cursor: pointer;
}

@media (max-width: 30rem) {
  .videos {
    display: flex;
    flex-direction: column;
  }

  .video-thumbnail {
    transform: scale(0.8);
  }
}

@media (min-width: 30rem) {
  .video-thumbnail {
    transform: scale(0.8);
  }
}
</style>