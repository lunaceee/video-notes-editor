<template>
  <div class="home">
    <h1>
      All videos
    </h1>
    <div class="videos">
      <div v-for="url in Object.keys(notes)" :key="url">
        <figure>
          <router-link
            :to="{
              name: 'VideoDetails',
              params: { slug: url },
            }"
          >
            <img
              src="https://i.pinimg.com/564x/06/11/6e/06116ec748dd82079f0c3c9c87c6ec4f.jpg"
              alt="cat face"
            />
          </router-link>
        </figure>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "home",
  computed: {
    ...mapGetters(["notes"]),
  },
};
</script>
