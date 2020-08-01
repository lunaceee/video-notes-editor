<template>
  <button
    class="btn"
    :class="[
    {'btn__primary': primary},
    {'btn__danger': danger}, 
    {'btn__mute': mute}
    ]"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "baseButton",
  props: {
    primary: {
      type: Boolean,
      description: "Whether it's a primary button",
    },
    danger: {
      type: Boolean,
      description: "Whether it's a danger button",
    },
    mute: {
      type: Boolean,
      description: "Whether it's a muted button",
    },
  },
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

.btn__danger {
  background-color: var(--btn-delete-bg);
  box-shadow: inset 0 -0.6em 0 -0.35em var(--btn-delete-border);
  cursor: pointer;
  color: var(--color-light);
}
</style>