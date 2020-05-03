<template>
  <div class="home">
    <h1>
      All videos
    </h1>
    <div class="videos">
      <div v-for="video in videos" :key="video.url">
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
  name: "home",
  components: {
    VideoPlayer,
  },
  computed: {
    ...mapState(["videos"]),
  },
};
</script>
