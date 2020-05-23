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
        alert("Please insert an URL");
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
  margin: 0.5rem;
  width: 18rem;
}

.input {
  border-radius: 0.2em;
  width: 18rem;
  height: 2.2rem;
  border: 2px solid #e8569f;
}

.input:focus {
  border-radius: 0.2rem;
  outline: none;
}

@media (min-width: 30rem) {
  .submit-button {
    width: 8rem;
  }
}
</style>