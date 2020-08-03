<template>
  <div class="form__feedback">
    <h2>Welcome to Cuttle!</h2>
    <router-link :to="{ name: 'home' }">Go to homepage</router-link>
  </div>
</template>
<script>
export default {
  name: "feedbackForm",
};
</script>
<style scoped>
.form__feedback {
  display: grid;
  justify-items: center;
}
</style>