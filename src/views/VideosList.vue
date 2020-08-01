<template>
  <ul class="videos">
    <li v-for="(video, index) in videos" :key="index">
      <base-card>
        <template v-slot:media>
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
        </template>
        <template v-slot:card-title>This is a title asdfadfadsfadfasdfasdadfasdfasfd</template>

        <template v-slot:buttons>
          <base-button class="btn__delete" @click.native="deleteVideo(video.videoId)">delete</base-button>
        </template>
      </base-card>
    </li>
  </ul>
</template>

<script>
import { mapState } from "vuex";
import { getVideoId } from "../utils";
import BaseButton from "@/components/BaseButton.vue";
import BaseCard from "@/components/BaseCard.vue";

export default {
  name: "VideosList",
  computed: {
    ...mapState(["videos"]),
  },
  components: { BaseButton, BaseCard },
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
  margin: 3rem 3rem 0 0;
}

.video-thumbnail img {
  -webkit-transition: all 0.5s ease;
  -moz-transition: all 0.5s ease;
  -ms-transition: all 0.5s ease;
  transition: all 0.5s ease;
  width: 100%;
}

/** create zoom effect on hover */
.video-thumbnail {
  overflow: hidden;
  width: 100%;
  margin: 0;
}

.video-thumbnail img:hover {
  transform: scale(1.1);
}

.btn__delete {
  background-color: var(--btn-delete-bg);
  box-shadow: inset 0 -0.6em 0 -0.35em var(--btn-delete-border);
  cursor: pointer;
}
</style>