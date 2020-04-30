<template>
  <div class="home">
    <h1>
      All videos
    </h1>
    <div class="videos">
      <div v-for="url in Object.keys(getNotes)" :key="url">
        <figure>
          <router-link
            :to="{
              name: 'VideoDetails',
              params: { slug: url },
            }"
          >
            <VideoPlayer :url="url" :controls="false" />
          </router-link>
        </figure>
      </div>
    </div>
  </div>
</template>

<script>
import VideoPlayer from "@/components/VideoPlayer.vue";
import { mapGetters } from "vuex";

export default {
  name: "home",
  components: {
    VideoPlayer,
  },
  computed: {
    ...mapGetters(["getNotes"]),
  },
};
</script>
