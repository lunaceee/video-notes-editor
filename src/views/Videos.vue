<template>
  <div class="videos">
    <div v-for="(video, index) in videos" :key="index" class="video-thumbnail">
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
    </div>
  </div>
</template>

<script>
import VideoPlayer from "@/components/VideoPlayer.vue";
import { mapState } from "vuex";
import { getVideoId } from "../utils";

export default {
  name: "Videos",
  components: {
    VideoPlayer
  },
  computed: {
    ...mapState(["videos"])
  },
  methods: {
    getVideoThumbnail(url) {
      const videoId = getVideoId(url);
      if (url.match(/youtu\.be/) || url.match(/v=/)) {
        return `https://img.youtube.com/vi/${videoId}/0.jpg`;
      }
      return `https://img.youtube.com/vi/pR7wqdjeV9s/0.jpg`;
    }
  }
};
</script>
<style scoped>
.videos {
  display: grid;
  grid-gap: 1rem;
  /* justify-items: center; */
}

.video-thumbnail img {
  width: 16rem;
  height: 11rem;
}

.video-thumbnail:hover {
  background-color: #ffcdd2;
}

@media (min-width: 40rem) {
  .videos {
    grid-template-columns: repeat(2, 2fr);
  }
}
@media (min-width: 62rem) {
  .videos {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 100rem) {
  .videos {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>