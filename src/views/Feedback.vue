<template>
  <div class="form-feedback">
    <h2>Thanks for joining Cuttle! Now you're able to create and share notes from your favorite videos!</h2>
    <router-link :to="{ name: 'home' }">Go to homepage</router-link>
  </div>
</template>
<script>
export default {
  name: "feedback"
};
</script>
