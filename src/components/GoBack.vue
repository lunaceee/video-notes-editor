<template>
  <div class="go-back">
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
.go-back {
  display: inline-block;
  cursor: pointer;
}

button {
  background-color: #3cb87d;
}
</style>
