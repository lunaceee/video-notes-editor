<template>
  <form class="form__add-url" @submit.prevent="onSubmit" id="addUrlForm">
    <input class="form__input" type="text" placeholder="Paste in a video URL..." />
    <input class="form__btn-submit" type="submit" value="Add video" />
  </form>
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
.form__add-url {
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
}

.form__input,
.form__btn-submit {
  margin: 0.5rem;
}

.form__input {
  min-width: 15rem;
  max-width: 30rem;
  padding: 0.5rem;
  font-size: small;
}

.form__btn-submit {
  min-width: auto;
  max-width: 30rem;
  box-shadow: inset 0 -0.6em 0 -0.35em var(--btn-primary-border);
}

.form__input::placeholder {
  color: var(--color-placeholder);
}

.form__input {
  border-radius: 0.2em;
  height: 2rem;
  border: 1px solid var(--btn-primary-bg);
}

.form__input:focus {
  border: 2px solid var(--btn-primary-bg);
  border-radius: 0.2rem;
  outline: none;
}

@media (max-width: 20rem) {
  .form__add-url {
    width: 100vw;
  }
}

@media (min-width: 20rem) {
  .form__add-url {
    width: 100%;
  }
}

@media (min-width: 40rem) {
  .form__add-url {
    flex-flow: row wrap;
  }

  .form__input {
    width: 30vw;
  }

  .form__btn-submit {
    width: auto;
  }
}
</style>