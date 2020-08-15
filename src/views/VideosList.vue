<template>
  <ul class="videos">
    <li v-for="(video, index) in videos" :key="index">
      <card>
        <template #thumbnail>
          <router-link
            :to="{
              name: 'VideoDetails',
              params: { slug: video.url },
            }"
          >
            <div
              class="thumbnail--holder"
              @mouseover="showByIndex = index"
              @mouseout="showByIndex = null"
            >
              <img
                class="thumbnail__img"
                :src="getVideoThumbnail(video.url)"
                :url="video.url"
                alt="video thumbnail"
              />
              <div class="thumbnail__play-btn" v-show="showByIndex === index"></div>
            </div>
          </router-link>
        </template>
        <template #title>This is a title</template>
        <template #bottom>
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
<style scoped>
.videos {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
  grid-gap: 4rem;
  margin-top: 3rem;
}

.videos li {
  position: relative;
}

.videos li::after {
  width: 100%;
  height: 100%;
  content: "";
  opacity: 0;
  border-radius: 0.5rem;
  position: absolute;
  top: 0;
  left: 0;
  box-shadow: 0 4px 8px 0 var(--lighter-grey);
  transition: opacity 0.2s ease-in-out;
}

.videos li:hover::after {
  opacity: 1;
  z-index: 0;
}

.thumbnail--holder {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  justify-items: center;
  align-items: center;
}

.thumbnail--holder,
.thumbnail__play-btn,
.thumbnail--holder:hover {
  transition: all 0.3s ease-in-out;
}

.thumbnail--holder:hover {
  opacity: 0.9;
}

.thumbnail__img,
.thumbnail__play-btn {
  grid-area: 1 / 1 / 2 / 2;
}

.thumbnail__play-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  font-size: 17px;
  background-color: var(--darkest-grey);
  color: var(--lightest-grey);
}

.thumbnail__play-btn::before {
  content: "▶";
}

.thumbnail__img {
  width: 100%;
}
</style>