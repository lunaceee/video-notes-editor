<template>
  <div class="grid text-center">
    <h2>Welcome to Cuttle!</h2>
    <p class="m-4">
      <router-link :to="{ name: 'home' }" class="underline"
        >Go to homepage</router-link
      >
    </p>
  </div>
</template>
<script>
export default {
  name: "feedbackForm",
};
</script>