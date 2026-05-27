<template>
  <Transition name="expand">
    <slot />
  </Transition>
</template>

<style scoped>
/* ===== Expand ===== */
.expand-move,
.expand-enter-active,
.expand-leave-active {
  transition-property: opacity, height, margin-top, margin-bottom, padding-top, padding-bottom;
  transition-duration: 0.3s;
  transition-timing-function: ease;
  overflow: clip;
  pointer-events: none;
}

.expand-leave-from,
.expand-enter-to {
  height: auto;
}

.expand-enter-from,
.expand-leave-to {
  height: 0 !important;
  margin-top: 0 !important;
  margin-bottom: 0 !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  opacity: 0;
}
</style>
