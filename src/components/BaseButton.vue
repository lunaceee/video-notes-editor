<template>
  <button
    class="btn"
    :class="[
    {'btn__primary': primary},
    {'btn__danger': danger}, 
    {'btn__mute': mute},
    {'btn__mobile': mobile},
    {'btn__secondary': secondary}
    ]"
  >
    <slot v-if="mobile">
      <base-icon>
        <slot></slot>
      </base-icon>
    </slot>
    <slot>{{text}}</slot>
  </button>
</template>

<script>
import IconUser from "@/components/icons/IconUser.vue";

export default {
  name: "baseButton",
  components: { IconUser },
  props: {
    secondary: {
      type: Boolean,
      description: "Whether it's a secondary button",
    },
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
    mobile: {
      type: Boolean,
      description: "Whether it's for mobile device",
    },
    text: {
      type: String,
      default: "",
      description: "Button text in case not provided via default slot",
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
  color: var(--btn-primary-color);
  box-shadow: inset 0 -0.6em 0 -0.35em var(--btn-primary-border);
  font-weight: 600;
}

.btn:focus {
  outline: none;
}

.btn:active {
  top: 0.1em;
}

.btn__danger {
  color: var(--btn-delete-color);
  background-color: var(--btn-delete-bg);
  box-shadow: inset 0 -0.6em 0 -0.35em var(--btn-delete-border);
  cursor: pointer;
}

.btn__default,
.btn__icon--mobile {
  grid-area: 1 / 1 / 2 / 2;
}
</style>