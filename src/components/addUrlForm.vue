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
  margin: 2rem;
}

.input,
.submit-button {
  margin: 0.5rem;
  display: block;
  width: 100%;
}

.input::placeholder {
  color: var(--color);
}

.input {
  border-radius: 0.2em;
  height: 2rem;
  border: 1px solid var(--btn-bg);
}

.input:focus {
  border: 2px solid var(--btn-bg);
  border-radius: 0.2rem;
  outline: none;
}

@media (min-width: 40rem) {
  .input,
  .submit-button {
    display: inline-block;
  }
  .input {
    width: 30%;
  }

  .submit-button {
    width: 15%;
  }
}

@media (min-width: 65rem) {
  .input {
    width: 20%;
  }
  .submit-button {
    width: 8%;
  }
}
</style>