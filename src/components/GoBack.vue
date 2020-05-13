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
  display: grid;
  cursor: pointer;
}

button {
  background-color: #3cb87d;
}

@media (min-width: 30rem) {
  .go-back {
    grid-template-columns: repeat(6, 1fr);
  }
}

@media (min-width: 60rem) {
  .go-back {
    grid-template-columns: repeat(12, 1fr);
  }
}
</style>
