<template>
  <NuxtLink
    :to="to"
    class="sidebar-link group flex items-center gap-2 rounded-md px-2 py-1.5 text-gray-600 transition-all hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-white/[0.04] dark:hover:text-gray-100"
    active-class="!bg-blue-50 !text-blue-600 dark:!bg-blue-500/10 dark:!text-blue-400"
  >
    <span class="truncate">{{ label }}</span>
    <span
      v-if="status"
      class="ml-auto h-1.5 w-1.5 flex-shrink-0 rounded-full"
      :class="{
        'bg-emerald-500 dark:bg-emerald-400': status === 'published',
        'bg-amber-500 dark:bg-amber-400': status === 'in-progress',
        'bg-gray-300 dark:bg-gray-600': status === 'draft',
      }"
      :title="status === 'published' ? '已发布' : status === 'in-progress' ? '进行中' : '草稿'"
    />
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
  to: string
  label: string
  status?: string
}>()
</script>
