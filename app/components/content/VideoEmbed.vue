<template>
  <figure class="my-6">
    <video
      :src="src"
      :poster="poster"
      controls
      playsinline
      class="w-full rounded-lg shadow-lg"
    />
    <figcaption v-if="$slots.default" class="mt-2 text-center text-sm text-gray-400">
      <slot />
    </figcaption>
  </figure>
</template>

<script setup lang="ts">
defineProps<{
  src: string
  poster?: string
}>()
</script>
