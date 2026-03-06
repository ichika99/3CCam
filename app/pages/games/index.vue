<template>
  <div>
    <h1 class="mb-2 text-xl sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">游戏相机分析</h1>
    <p class="mb-6 sm:mb-8 text-sm text-gray-400 dark:text-gray-500">从侧边栏选择一款游戏开始阅读，或浏览下方列表。</p>

    <ContentList path="/games" v-slot="{ list }">
      <div class="space-y-3">
        <NuxtLink
          v-for="article in list"
          :key="article._path"
          :to="article._path"
          class="group flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 rounded-lg border border-gray-200 bg-gray-50 px-4 sm:px-5 py-3 sm:py-4 transition-all hover:border-blue-300 hover:bg-blue-50 active:scale-[0.99] dark:border-white/[0.06] dark:bg-white/[0.02] dark:hover:border-blue-500/20 dark:hover:bg-blue-500/[0.03]"
        >
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2">
              <h3 class="text-sm font-medium text-gray-700 group-hover:text-blue-600 dark:text-gray-200 dark:group-hover:text-blue-400 transition-colors truncate">
                {{ article.title }}
              </h3>
              <span
                class="h-1.5 w-1.5 flex-shrink-0 rounded-full"
                :class="{
                  'bg-emerald-500 dark:bg-emerald-400': article.status === 'published',
                  'bg-amber-500 dark:bg-amber-400': article.status === 'in-progress',
                  'bg-gray-300 dark:bg-gray-600': article.status === 'draft',
                }"
              />
            </div>
            <div class="mt-1 flex items-center gap-3 text-xs text-gray-400 dark:text-gray-500">
              <span v-if="article.developer">{{ article.developer }}</span>
              <span v-if="article.genre">{{ article.genre }}</span>
            </div>
          </div>
          <div v-if="article.camera_type" class="flex flex-shrink-0 flex-wrap gap-1.5">
            <span
              v-for="type in article.camera_type"
              :key="type"
              class="rounded bg-gray-100 px-2 py-0.5 text-[11px] text-gray-500 dark:bg-white/[0.04]"
            >
              {{ type }}
            </span>
          </div>
        </NuxtLink>
      </div>
    </ContentList>
  </div>
</template>

<script setup lang="ts">
useHead({ title: '游戏分析 - 3CCam' })
</script>
