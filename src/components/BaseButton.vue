<template>
  <button
    class="rounded border-b-4 text-white text-sm focus:outline-none focus:shadow-outline transition duration-300 ease-in-out uppercase h-10"
    :class="VARIANT_MAPS[variant]"
  >
    <slot />
  </button>
</template>
<script>
export default {
  name: "baseButton",
  data() {
    return {
      VARIANT_MAPS: {
        GRAY: "bg-gray-500 border-gray-700",
        LIGHTGRAY:
          "bg-gray-300 border-gray-400 hover:bg-gray-200 hover:border-fray-300 text-gray-700",
        RED: "bg-red-500 border-red-700 hover:bg-red-300 hover:border-red-400",
        ORANGE: "bg-orange-500 border-orange-700",
        YELLOW: "bg-yellow-500 border-yellow-700",
        GREEN: "bg-green-500 border-green-700",
        TEAL:
          "bg-teal-500 border-teal-700 hover:bg-teal-300 hover:border-teal-400",
        BLUE: "bg-blue-500 border-blue-700",
        INDIGO: "bg-indigo-500 border-indigo-700",
        PURPLE: "bg-purple-500 border-purple-700",
        PINK: "bg-pink-500 border-pink-700",
      },
    };
  },
  props: {
    variant: {
      type: String,
      default: "TEAL",
    },
  },
};
</script>