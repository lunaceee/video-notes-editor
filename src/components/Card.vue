<template>
  <div class="card">
    <div class="card__thumbnail" v-if="$slots.thumbnail">
      <slot name="thumbnail"></slot>
    </div>
    <div class="card__body">
      <div class="card__title" v-if="$slots.title">
        <h1>
          <slot name="title"></slot>
        </h1>
      </div>
      <div class="card__description" v-if="$slots.description">
        <p>
          <slot name="description"></slot>
        </p>
      </div>
      <div class="card__bottom" v-if="$slots.bottom">
        <slot name="bottom"></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "card",
};
</script>
<style scoped>
.card {
  position: relative;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px 0 var(--lighter-grey);
  cursor: pointer;
  z-index: 1;
}

.card .card__thumbnail {
  position: relative;
  overflow: hidden;
}

.card__thumbnail {
  border-radius: 0.5rem 0.5rem 0 0;
}

.card__title {
  line-height: 1.5;
  word-wrap: break-word;
}

.card__title h1 {
  font-size: 1.2rem;
  font-weight: 400;
}

.card__body {
  padding: 2rem;
}

.card__bottom {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}
</style>