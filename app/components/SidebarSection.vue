<template>
  <div class="mb-4">
    <button
      class="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
      @click="open = !open"
    >
      <span>{{ icon }}</span>
      <span>{{ title }}</span>
      <svg
        class="ml-auto h-3 w-3 transition-transform"
        :class="{ 'rotate-90': open }"
        fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </button>
    <div v-show="open" class="mt-1 space-y-0.5 pl-2">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  icon?: string
}>()

const open = ref(true)
</script>
