<template>
  <div class="flex h-screen overflow-hidden bg-white text-gray-800 dark:bg-[#0f1117] dark:text-gray-200 transition-colors">
    <!-- 左侧边栏 -->
    <aside class="sidebar flex w-64 flex-shrink-0 flex-col border-r border-gray-200 bg-gray-50 dark:border-white/[0.06] dark:bg-[#13151b] transition-colors">
      <!-- Logo -->
      <div class="flex h-14 items-center gap-2 border-b border-gray-200 dark:border-white/[0.06] px-5">
        <NuxtLink to="/" class="flex items-center gap-2 text-lg font-semibold tracking-tight">
          <span class="text-blue-500 dark:text-blue-400">3C</span><span class="text-gray-900 dark:text-gray-100">Cam</span>
        </NuxtLink>
        <span class="ml-auto rounded bg-blue-100 px-1.5 py-0.5 text-[10px] font-medium text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">研究</span>
      </div>

      <!-- 导航树 -->
      <nav class="flex-1 overflow-y-auto px-3 py-4 text-[13px]">
        <!-- 游戏分析 -->
        <SidebarSection title="游戏分析" icon="🎮">
          <ContentList path="/games" v-slot="{ list }">
            <SidebarLink
              v-for="item in list"
              :key="item._path ?? ''"
              :to="item._path ?? ''"
              :label="(item.title ?? '').replace(' - 相机系统分析', '')"
              :status="item.status"
            />
          </ContentList>
        </SidebarSection>

        <!-- 专题对比 -->
        <SidebarSection title="专题对比" icon="📊">
          <ContentList path="/topics" v-slot="{ list }">
            <SidebarLink
              v-for="item in list"
              :key="item._path ?? ''"
              :to="item._path ?? ''"
              :label="(item.title ?? '').replace(' - 相机系统分析', '')"
              :status="item.status"
            />
          </ContentList>
        </SidebarSection>

        <!-- 笔记 -->
        <SidebarSection title="笔记" icon="📝">
          <ContentList path="/notes" v-slot="{ list }">
            <SidebarLink
              v-for="item in list"
              :key="item._path ?? ''"
              :to="item._path ?? ''"
              :label="item.title ?? ''"
            />
          </ContentList>
        </SidebarSection>
      </nav>

      <!-- 底部信息 -->
      <div class="border-t border-gray-200 dark:border-white/[0.06] px-5 py-3 text-[11px] text-gray-400 dark:text-gray-500">
        3D Action Camera Research
      </div>
    </aside>

    <!-- 右侧内容区 -->
    <main class="flex flex-1 flex-col overflow-hidden">
      <!-- 顶栏 -->
      <header class="flex h-14 flex-shrink-0 items-center justify-between border-b border-gray-200 dark:border-white/[0.06] px-8">
        <div class="text-sm text-gray-500 dark:text-gray-400">
          <NuxtLink to="/" class="hover:text-gray-800 dark:hover:text-gray-200 transition-colors">首页</NuxtLink>
        </div>
        <!-- 主题切换按钮 -->
        <button
          class="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/[0.06] dark:hover:text-gray-200"
          @click="toggle"
          :title="isDark ? '切换到亮色模式' : '切换到暗色模式'"
        >
          <svg v-if="isDark" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
          </svg>
          <svg v-else class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
          </svg>
          <span>{{ isDark ? '亮色' : '暗色' }}</span>
        </button>
      </header>
      <!-- 内容 -->
      <div class="flex-1 overflow-y-auto bg-white dark:bg-[#0f1117] transition-colors">
        <div class="mx-auto max-w-4xl px-8 py-8">
          <slot />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
const { isDark, toggle } = useTheme()
</script>
