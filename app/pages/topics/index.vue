<template>
  <div>
    <h1 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">专题对比</h1>
    <p class="mb-8 text-sm text-gray-400 dark:text-gray-500">跨游戏横向分析特定相机特性。</p>

    <ContentList path="/topics" v-slot="{ list }">
      <div class="space-y-3">
        <NuxtLink
          v-for="article in list"
          :key="article._path"
          :to="article._path"
          class="group block rounded-lg border border-gray-200 bg-gray-50 px-5 py-4 transition-all hover:border-blue-300 hover:bg-blue-50 dark:border-white/[0.06] dark:bg-white/[0.02] dark:hover:border-blue-500/20 dark:hover:bg-blue-500/[0.03]"
        >
          <h3 class="text-sm font-medium text-gray-700 group-hover:text-blue-600 dark:text-gray-200 dark:group-hover:text-blue-400 transition-colors">
            {{ article.title }}
          </h3>
          <p v-if="article.description" class="mt-1 text-xs text-gray-400 dark:text-gray-500 line-clamp-2">
            {{ article.description }}
          </p>
        </NuxtLink>
      </div>
    </ContentList>
  </div>
</template>

<script setup lang="ts">
useHead({ title: '专题对比 - 3CCam' })
</script>
