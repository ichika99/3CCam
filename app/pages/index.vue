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

    <!-- 快捷入口 -->
    <div class="mt-4 grid w-full max-w-xl gap-3 grid-cols-1 sm:grid-cols-3">
      <NuxtLink
        to="/games/ninja-gaiden"
        class="group rounded-xl border border-gray-200 bg-gray-50 p-4 sm:p-5 text-center transition-all hover:border-blue-300 hover:bg-blue-50 active:scale-[0.98] dark:border-white/[0.06] dark:bg-white/[0.02] dark:hover:border-blue-500/30 dark:hover:bg-blue-500/[0.04]"
      >
        <div class="mb-2 text-2xl">🎮</div>
        <h3 class="text-sm font-medium text-gray-700 group-hover:text-blue-600 dark:text-gray-200 dark:group-hover:text-blue-400 transition-colors">游戏分析</h3>
        <p class="mt-1 text-xs text-gray-400 dark:text-gray-500">6 款游戏</p>
      </NuxtLink>
      <NuxtLink
        to="/topics/lock-on"
        class="group rounded-xl border border-gray-200 bg-gray-50 p-4 sm:p-5 text-center transition-all hover:border-blue-300 hover:bg-blue-50 active:scale-[0.98] dark:border-white/[0.06] dark:bg-white/[0.02] dark:hover:border-blue-500/30 dark:hover:bg-blue-500/[0.04]"
      >
        <div class="mb-2 text-2xl">📊</div>
        <h3 class="text-sm font-medium text-gray-700 group-hover:text-blue-600 dark:text-gray-200 dark:group-hover:text-blue-400 transition-colors">专题对比</h3>
        <p class="mt-1 text-xs text-gray-400 dark:text-gray-500">跨游戏分析</p>
      </NuxtLink>
      <NuxtLink
        to="/notes/first-note"
        class="group rounded-xl border border-gray-200 bg-gray-50 p-4 sm:p-5 text-center transition-all hover:border-blue-300 hover:bg-blue-50 active:scale-[0.98] dark:border-white/[0.06] dark:bg-white/[0.02] dark:hover:border-blue-500/30 dark:hover:bg-blue-500/[0.04]"
      >
        <div class="mb-2 text-2xl">📝</div>
        <h3 class="text-sm font-medium text-gray-700 group-hover:text-blue-600 dark:text-gray-200 dark:group-hover:text-blue-400 transition-colors">笔记</h3>
        <p class="mt-1 text-xs text-gray-400 dark:text-gray-500">灵感记录</p>
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
useHead({
  title: '3CCam - 3D动作游戏相机设计研究',
})
</script>
