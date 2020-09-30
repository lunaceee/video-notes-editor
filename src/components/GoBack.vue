<template>
  <router-link :to="{ name: 'home' }" class="text-teal-500">
    <base-button variant="DARKGRAY" class="w-20"> Back </base-button>
  </router-link>
</template>

<script>
export default {
  name: "goHome",
  methods: {
    goBack() {
      return this.$router.home;
    },
  },
};
</script>