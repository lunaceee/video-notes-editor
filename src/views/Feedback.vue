<template>
  <div class="form-feedback">
    <h2>Thanks for joining Cuttle!</h2>
    <router-link :to="{ name: 'home' }">
      Go to homepage
    </router-link>
  </div>
</template>
<script>
export default {
  name: "feedback",
};
</script>
