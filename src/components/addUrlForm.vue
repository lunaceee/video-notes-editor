<template>
  <div class="url-form">
    <form @submit.prevent="onSubmit" id="addUrlForm">
      <input class="input" type="text" placeholder="Paste in a video URL..." />
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
        document.getElementById("addUrlForm").reset();
      } else {
        alert("Invalid video URL");
      }
    }
  }
};
</script>
<style scoped>
.url-form {
  display: grid;
}

.input,
.submit-button {
  margin: 1rem;
  width: 18rem;
}

.input {
  -webkit-appearance: none;
  appearance: none; /* remove default appearance */
  border-radius: 0.2em;
  width: 18rem;
  height: 2.2rem;
}

@media (min-width: 30rem) {
  .submit-button {
    width: 8rem;
  }
}

@media (min-width: 60rem) {
  .url-form {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>