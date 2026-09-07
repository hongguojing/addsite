<template>
  <div
    v-motion
    :initial="{ opacity: 0, y: yOffset, scale: 0.98 }"
    :visible-once="{
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      },
    }"
    class="motion-reveal"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    delay?: number;
    duration?: number;
    yOffset?: number;
  }>(),
  {
    delay: 0,
    duration: 550,
    yOffset: 18,
  },
);
</script>

<style scoped>
.motion-reveal {
  width: 100%;
}
</style>
