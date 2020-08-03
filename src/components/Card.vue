<template>
  <div class="card">
    <div class="card__media">
      <slot name="media"></slot>
    </div>
    <div class="card__body">
      <div class="card__title">
        <h1>
          <slot name="card-title"></slot>
        </h1>
      </div>
      <div class="card__supporting-text">
        <p>
          <slot name="supporting-text"></slot>
        </p>
      </div>
      <div class="card__footer">
        <slot name="footer"></slot>
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
  border-radius: 0.2rem;
  box-shadow: 0 1px 1px 0 rgba(66, 66, 66, 0.08),
    0 1px 3px 1px rgba(66, 66, 66, 0.16);
  position: relative;
  overflow: hidden;
}

.card__media {
  overflow: hidden;
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

.card__footer {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}
</style>