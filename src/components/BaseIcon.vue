<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    viewBox="0 0 20 20"
    :aria-labelledby="iconType"
    role="presentation"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    :class="['feather', `feather-${iconType}`]"
  >
    <title :id="iconType" lang="en">{{ iconType }} icon</title>
    <g :fill="iconColor">
      <slot />
    </g>
  </svg>
</template>

<script>
export default {
  name: "baseIcon",
  props: {
    iconType: {
      type: String,
      default: "user",
    },
    width: {
      type: [Number, String],
      default: 20,
    },
    height: {
      type: [Number, String],
      default: 20,
    },
    iconColor: {
      type: String,
      default: "currentColor",
    },
  },
};
</script>