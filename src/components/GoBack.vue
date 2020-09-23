<template>
  <router-link :to="{ name: 'home' }" class="text-teal-500">
    <base-button variant="TEAL" class="xs:w-3/5 sm:w-2/5"> Back </base-button>
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