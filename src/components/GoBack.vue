<template>
  <router-link :to="{name: 'home'}">Go home</router-link>
</template>

<script>
export default {
  name: "GoBack",
  methods: {
    goBack() {
      return this.$router.home;
    }
  }
};
</script>
