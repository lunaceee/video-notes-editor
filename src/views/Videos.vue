<template>
  <div class="home">
    <div class="videos">
      <div v-for="video in videos" :key="video.url" class="video-thumbnail">
        <figure>
          <router-link
            :to="{
              name: 'VideoDetails',
              params: { slug: video.url },
            }"
          >
            <VideoPlayer :url="video.url" :controls="false" />
          </router-link>
        </figure>
      </div>
    </div>
  </div>
</template>

<script>
import VideoPlayer from "@/components/VideoPlayer.vue";
import { mapState } from "vuex";

export default {
  name: "Videos",
  components: {
    VideoPlayer
  },
  computed: {
    ...mapState(["videos"])
  }
};
</script>
<style scoped>
.videos {
  display: grid;
  grid-gap: 0.1rem;
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