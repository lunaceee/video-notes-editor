<template>
  <div>
    <button @click="goBack">go back</button>
  </div>
</template>

<script>
export default {
  name: "GoBack",
  methods: {
    goBack() {
      return this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
button {
  background-color: var(--btn-goback-bg);
}
</style>
