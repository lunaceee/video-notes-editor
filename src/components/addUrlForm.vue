<template>
  <div>
    <form @submit.prevent="onSubmit" class="url-form">
      <input class="input" type="text" placeholder="Paste in a URL..." />
      <input class="submit-button" type="submit" value="Add video" />
    </form>
  </div>
</template>
<script>
export default {
  name: "AddURLForm",
  methods: {
    onSubmit(e) {
      const newUrl = e.target[0].value || "";
      if (newUrl) {
        this.$store.commit("addVideo", newUrl);
        e.target[0].value = "";
      } else {
        alert("Invalid URL");
      }
    }
  }
};
</script>
<style scoped>
.url-form {
  display: flex;
  justify-content: center;
  align-items: center;
}

.input,
.submit-button {
  display: inline;
  margin: 0.5rem;
}

.input {
  -webkit-appearance: none;
  appearance: none; /* remove default appearance */
  border-radius: 0.2em;
  width: 18rem;
  height: 2.2rem;
}
</style>