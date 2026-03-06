<template>
  <div class="my-6 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800/50 dark:bg-blue-950/30">
    <div class="mb-2 flex items-center gap-2 text-sm font-medium text-blue-700 dark:text-blue-300">
      <Icon name="heroicons:information-circle" class="h-5 w-5" />
      <span>{{ label || '提示' }}</span>
    </div>
    <div class="text-sm text-blue-600/80 dark:text-blue-200/80">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label?: string
}>()
</script>
