<template>
  <div>
    <button @click="$modal.show('login')">account</button>
    <login-modal />
  </div>
</template>
<script>
import LoginModal from "./loginModal.vue";
export default {
  name: "authentication",
  components: {
    LoginModal
  }
};
</script>
<style >
</style>