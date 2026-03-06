<template>
  <figure class="my-6">
    <div class="grid gap-2" :class="gridClass">
      <slot />
    </div>
    <figcaption v-if="caption" class="mt-2 text-center text-sm text-gray-400">
      {{ caption }}
    </figcaption>
  </figure>
</template>

<script setup lang="ts">
const props = defineProps<{
  cols?: number
  caption?: string
}>()

const gridClass = computed(() => {
  const c = props.cols || 2
  return `grid-cols-${c}`
})
</script>
