<template>
  <div class="flex flex-col items-center justify-center py-12 sm:py-20 px-4">
    <!-- Logo 区域 -->
    <div class="mb-8 text-center">
      <h1 class="text-4xl sm:text-5xl font-bold tracking-tight">
        <span class="text-blue-500 dark:text-blue-400">3C</span><span class="text-gray-900 dark:text-white">Cam</span>
      </h1>
      <p class="mt-4 text-base sm:text-lg leading-relaxed text-gray-500 dark:text-gray-400">
        3D 动作游戏相机系统 · 拆解分析 · 设计研究
      </p>
      <p class="mt-2 text-xs sm:text-sm text-gray-400 dark:text-gray-500">
        系统性拆解主流动作游戏的相机设计，服务于 UE5 第三人称相机开发
      </p>
    </div>

    <!-- 快捷入口（由配置驱动） -->
    <div
      class="mt-4 grid w-full max-w-xl gap-3 grid-cols-1"
      :class="gridColsClass"
    >
      <NuxtLink
        v-for="section in sidebarSections"
        :key="section.contentPath"
        :to="firstArticle[section.contentPath] ?? section.contentPath"
        class="group rounded-xl border border-gray-200 bg-gray-50 p-4 sm:p-5 text-center transition-all hover:border-blue-300 hover:bg-blue-50 active:scale-[0.98] dark:border-white/[0.06] dark:bg-white/[0.02] dark:hover:border-blue-500/30 dark:hover:bg-blue-500/[0.04]"
      >
        <div class="mb-2 text-2xl">{{ section.icon }}</div>
        <h3 class="text-sm font-medium text-gray-700 group-hover:text-blue-600 dark:text-gray-200 dark:group-hover:text-blue-400 transition-colors">{{ section.title }}</h3>
        <p class="mt-1 text-xs text-gray-400 dark:text-gray-500">
          {{ section.homeDescription || articleCount[section.contentPath] + ' 篇文章' }}
        </p>
      </NuxtLink>
    </div>

    <!-- 项目说明 -->
    <div class="mt-8 sm:mt-12 w-full max-w-lg rounded-xl border border-gray-200 bg-gray-50 p-5 sm:p-6 text-sm leading-relaxed text-gray-500 dark:border-white/[0.06] dark:bg-white/[0.02] dark:text-gray-400">
      <p class="mb-3">
        <span class="font-medium text-gray-700 dark:text-gray-200">项目目标：</span>
        从实际游戏出发，系统记录各类 3D 动作游戏的相机行为参数与设计策略。
      </p>
      <p>
        每款游戏按照统一的框架进行拆解：<span class="text-gray-700 dark:text-gray-300">探索相机</span>、<span class="text-gray-700 dark:text-gray-300">战斗相机</span>、<span class="text-gray-700 dark:text-gray-300">特殊相机</span>、<span class="text-gray-700 dark:text-gray-300">参数采集</span>，以便横向对比与开发参考。
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { sidebarSections } from '~/config/sidebar'

useHead({
  title: '3CCam - 3D动作游戏相机设计研究',
})

// 根据 section 数量动态计算网格列数
const gridColsClass = computed(() => {
  const count = sidebarSections.length
  if (count <= 2) return 'sm:grid-cols-2'
  if (count <= 3) return 'sm:grid-cols-3'
  return 'sm:grid-cols-2 lg:grid-cols-4'
})

// 动态查询每个 section 的文章数量和第一篇文章路径
const articleCount = reactive<Record<string, number>>({})
const firstArticle = reactive<Record<string, string>>({})

for (const section of sidebarSections) {
  const { data } = await useAsyncData(
    `home-${section.contentPath}`,
    () =>
      queryContent(section.contentPath)
        .where({ visible: { $ne: false } })
        .only(['_path'])
        .find()
  )
  watchEffect(() => {
    const list = data.value ?? []
    articleCount[section.contentPath] = list.length
    firstArticle[section.contentPath] = list[0]?._path ?? section.contentPath
  })
}
</script>
