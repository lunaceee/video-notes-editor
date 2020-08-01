<template>
  <button class="btn btn__primary">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "baseButton",
};
</script>
<style>
.btn {
  display: inline-block;
  font-family: inherit;
  font-size: 100%;
  box-sizing: border-box;
  text-decoration: none;
  text-transform: uppercase;
  font-size: 0.8rem;
  padding: 0.7em 1.4em;
  margin: 0 0.3em 0.3em 0;
  border-radius: 0.3rem;
  border-style: none;
  text-align: center;
  position: relative;
  -webkit-appearance: none;
  -moz-appearance: none;
}

.btn__primary {
  background-color: var(--btn-primary-bg);
  color: var(--color-light);
  box-shadow: inset 0 -0.6em 0 -0.35em var(--btn-primary-border);
}

.btn:focus {
  outline: none;
}

.btn:active {
  top: 0.1em;
}
</style>