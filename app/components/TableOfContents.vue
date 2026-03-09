<template>
  <!-- 桌面端：右侧固定浮动 TOC -->
  <nav
    v-if="mode === 'desktop' && links.length"
    class="toc hidden xl:block"
  >
    <div class="sticky top-8">
      <h4 class="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
        目录
      </h4>
      <ul class="space-y-1 text-[13px] leading-relaxed">
        <li v-for="link in links" :key="link.id">
          <a
            :href="`#${link.id}`"
            class="toc-link block rounded-md px-2 py-1 transition-colors duration-150"
            :class="[
              activeId === link.id
                ? 'bg-blue-50 text-blue-600 font-medium dark:bg-blue-500/10 dark:text-blue-400'
                : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-white/[0.04]',
            ]"
            @click.prevent="scrollToHeading(link.id)"
          >
            {{ link.text }}
          </a>
          <ul v-if="link.children?.length" class="mt-1 space-y-0.5 pl-3">
            <li v-for="child in link.children" :key="child.id">
              <a
                :href="`#${child.id}`"
                class="toc-link block rounded-md px-2 py-0.5 text-xs transition-colors duration-150"
                :class="[
                  activeId === child.id
                    ? 'text-blue-600 font-medium dark:text-blue-400'
                    : 'text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300',
                ]"
                @click.prevent="scrollToHeading(child.id)"
              >
                {{ child.text }}
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>

  <!-- 移动端/平板：悬浮球 + 侧栏抽屉 -->
  <Teleport to="body">
    <div v-if="mode === 'mobile' && links.length" class="xl:hidden">
      <!-- 悬浮球按钮 -->
      <button
        v-show="!drawerOpen"
        class="toc-fab fixed z-50 flex h-11 w-11 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg shadow-blue-500/25 transition-all duration-200 hover:bg-blue-600 hover:shadow-xl hover:shadow-blue-500/30 active:scale-95"
        :style="fabStyle"
        @click="drawerOpen = true"
        title="文章目录"
      >
        <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg>
      </button>

      <!-- 遮罩 -->
      <Transition name="toc-overlay">
        <div
          v-if="drawerOpen"
          class="fixed inset-0 z-50 bg-black/40"
          @click="drawerOpen = false"
        />
      </Transition>

      <!-- 侧栏抽屉 -->
      <Transition name="toc-drawer">
        <div
          v-if="drawerOpen"
          class="fixed inset-y-0 right-0 z-50 flex w-72 max-w-[85vw] flex-col bg-white shadow-2xl dark:bg-[#1a1d27]"
        >
          <!-- 抽屉头部 -->
          <div class="flex h-14 items-center justify-between border-b border-gray-200 px-5 dark:border-white/[0.06]">
            <h4 class="text-sm font-semibold text-gray-800 dark:text-gray-200">文章目录</h4>
            <button
              class="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-white/[0.06] dark:hover:text-gray-200"
              @click="drawerOpen = false"
            >
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- 目录列表 -->
          <nav class="flex-1 overflow-y-auto overscroll-contain px-4 py-4">
            <ul class="space-y-1 text-[14px] leading-relaxed">
              <li v-for="link in links" :key="link.id">
                <a
                  :href="`#${link.id}`"
                  class="block rounded-md px-3 py-2 text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-white/[0.06] dark:hover:text-gray-100"
                  :class="[
                    activeId === link.id ? 'bg-blue-50 !text-blue-600 font-medium dark:bg-blue-500/10 dark:!text-blue-400' : '',
                  ]"
                  @click.prevent="scrollToFromDrawer(link.id)"
                >
                  {{ link.text }}
                </a>
                <ul v-if="link.children?.length" class="mt-0.5 space-y-0.5 pl-4">
                  <li v-for="child in link.children" :key="child.id">
                    <a
                      :href="`#${child.id}`"
                      class="block rounded-md px-3 py-1.5 text-[13px] text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/[0.06] dark:hover:text-gray-200"
                      :class="[
                        activeId === child.id ? '!text-blue-600 font-medium dark:!text-blue-400' : '',
                      ]"
                      @click.prevent="scrollToFromDrawer(child.id)"
                    >
                      {{ child.text }}
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </Transition>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
interface TocLink {
  id: string
  text: string
  depth: number
  children?: TocLink[]
}

const props = defineProps<{
  links: TocLink[]
  mode: 'desktop' | 'mobile'
}>()

const drawerOpen = ref(false)
const activeId = ref('')

// 悬浮球位置
const fabStyle = computed(() => ({
  bottom: '24px',
  right: '20px',
}))

function getScrollContainer(): HTMLElement | null {
  return document.getElementById('main-scroll-container')
}

function scrollToHeading(id: string) {
  const el = document.getElementById(id)
  if (!el) return

  const container = getScrollContainer()
  if (container) {
    const elRect = el.getBoundingClientRect()
    const containerRect = container.getBoundingClientRect()
    const offset = elRect.top - containerRect.top + container.scrollTop - 80
    container.scrollTo({ top: offset, behavior: 'smooth' })
  } else {
    // fallback: 使用 scrollIntoView
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

function scrollToFromDrawer(id: string) {
  drawerOpen.value = false
  // 等动画结束后再滚动，避免视觉冲突
  setTimeout(() => {
    scrollToHeading(id)
  }, 150)
}

// Intersection Observer 追踪当前可见标题
let observer: IntersectionObserver | null = null

onMounted(() => {
  const allIds: string[] = []
  for (const link of props.links) {
    allIds.push(link.id)
    if (link.children) {
      for (const child of link.children) {
        allIds.push(child.id)
      }
    }
  }

  if (!allIds.length) return

  const container = getScrollContainer()

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          activeId.value = entry.target.id
        }
      }
    },
    {
      root: container,
      rootMargin: '-80px 0px -60% 0px',
      threshold: 0,
    }
  )

  nextTick(() => {
    for (const id of allIds) {
      const el = document.getElementById(id)
      if (el) observer!.observe(el)
    }
  })
})

onUnmounted(() => {
  observer?.disconnect()
})

// 路由变化时关闭抽屉
const route = useRoute()
watch(() => route.fullPath, () => {
  drawerOpen.value = false
})
</script>

<style scoped>
/* 桌面端 TOC 左边线 */
.toc .sticky {
  border-left: 2px solid theme('colors.gray.200');
  padding-left: 0.75rem;
}
:is(.dark) .toc .sticky {
  border-left-color: rgba(255, 255, 255, 0.06);
}

/* 遮罩动画 */
.toc-overlay-enter-active,
.toc-overlay-leave-active {
  transition: opacity 0.25s ease;
}
.toc-overlay-enter-from,
.toc-overlay-leave-to {
  opacity: 0;
}

/* 侧栏抽屉动画 */
.toc-drawer-enter-active,
.toc-drawer-leave-active {
  transition: transform 0.3s cubic-bezier(0.32, 0.72, 0, 1);
}
.toc-drawer-enter-from,
.toc-drawer-leave-to {
  transform: translateX(100%);
}

/* 悬浮球呼吸动画 */
.toc-fab {
  animation: toc-fab-breathe 3s ease-in-out infinite;
}
@keyframes toc-fab-breathe {
  0%, 100% { box-shadow: 0 4px 14px rgba(59, 130, 246, 0.25); }
  50% { box-shadow: 0 4px 20px rgba(59, 130, 246, 0.4); }
}
</style>
