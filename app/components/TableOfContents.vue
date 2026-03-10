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
      <ul class="space-y-0.5 text-[13px] leading-relaxed">
        <li v-for="link in links" :key="link.id">
          <!-- h2 级别：始终显示 -->
          <a
            :href="`#${link.id}`"
            class="toc-link block rounded-md px-2 py-1 transition-colors duration-150"
            :class="[
              isActive(link.id)
                ? 'bg-blue-50 text-blue-600 font-medium dark:bg-blue-500/10 dark:text-blue-400'
                : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-white/[0.04]',
            ]"
            @click.prevent="scrollToHeading(link.id)"
          >
            {{ link.text }}
          </a>
          <!-- h3 子级：始终显示（常驻） -->
          <ul
            v-if="link.children?.length"
            class="mt-0.5 space-y-0.5 pl-3"
          >
            <li v-for="child in link.children" :key="child.id">
              <a
                :href="`#${child.id}`"
                class="toc-link block rounded-md px-2 py-0.5 text-xs transition-colors duration-150"
                :class="[
                  isActive(child.id)
                    ? 'text-blue-600 font-medium dark:text-blue-400'
                    : 'text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300',
                ]"
                @click.prevent="scrollToHeading(child.id)"
              >
                {{ child.text }}
              </a>
              <!-- h4+ 子级：仅当父级 h3 处于激活区域时展开（带防抖） -->
              <div
                v-if="child.children?.length"
                class="toc-h4-wrapper overflow-hidden"
                :class="shouldShowChildren(child) ? 'toc-h4-expanded' : 'toc-h4-collapsed'"
              >
                <ul class="mt-0.5 space-y-0.5 pl-3">
                  <li v-for="grandchild in child.children" :key="grandchild.id">
                    <a
                      :href="`#${grandchild.id}`"
                      class="toc-link block rounded-md px-2 py-0.5 text-xs transition-colors duration-150"
                      :class="[
                        isActive(grandchild.id)
                          ? 'text-blue-600 font-medium dark:text-blue-400'
                          : 'text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300',
                      ]"
                      @click.prevent="scrollToHeading(grandchild.id)"
                    >
                      {{ grandchild.text }}
                    </a>
                  </li>
                </ul>
              </div>
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

          <!-- 目录列表（移动端展示全部层级，不做折叠） -->
          <nav class="flex-1 overflow-y-auto overscroll-contain px-4 py-4">
            <ul class="space-y-1 text-[14px] leading-relaxed">
              <li v-for="link in links" :key="link.id">
                <a
                  :href="`#${link.id}`"
                  class="block rounded-md px-3 py-2 text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-white/[0.06] dark:hover:text-gray-100"
                  :class="[
                    isActive(link.id) ? 'bg-blue-50 !text-blue-600 font-medium dark:bg-blue-500/10 dark:!text-blue-400' : '',
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
                        isActive(child.id) ? '!text-blue-600 font-medium dark:!text-blue-400' : '',
                      ]"
                      @click.prevent="scrollToFromDrawer(child.id)"
                    >
                      {{ child.text }}
                    </a>
                    <ul v-if="child.children?.length" class="mt-0.5 space-y-0.5 pl-4">
                      <li v-for="grandchild in child.children" :key="grandchild.id">
                        <a
                          :href="`#${grandchild.id}`"
                          class="block rounded-md px-3 py-1.5 text-[12px] text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:text-gray-500 dark:hover:bg-white/[0.06] dark:hover:text-gray-300"
                          :class="[
                            isActive(grandchild.id) ? '!text-blue-600 font-medium dark:!text-blue-400' : '',
                          ]"
                          @click.prevent="scrollToFromDrawer(grandchild.id)"
                        >
                          {{ grandchild.text }}
                        </a>
                      </li>
                    </ul>
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

// 防抖后的 activeId，用于控制 h4+ 展开
// 避免快速滚动时子标题闪烁
const debouncedActiveId = ref('')
let debounceTimer: ReturnType<typeof setTimeout> | null = null
const DEBOUNCE_DELAY = 150 // ms

watch(activeId, (newVal) => {
  if (debounceTimer) clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    debouncedActiveId.value = newVal
  }, DEBOUNCE_DELAY)
})

// 悬浮球位置
const fabStyle = computed(() => ({
  bottom: '24px',
  right: '20px',
}))

// 构建每个父级下包含的全部后代 id 集合
const parentDescendantsMap = computed(() => {
  const map = new Map<string, Set<string>>()

  for (const h2 of props.links) {
    const h2Descendants = new Set<string>()
    h2Descendants.add(h2.id)
    if (h2.children) {
      for (const h3 of h2.children) {
        h2Descendants.add(h3.id)
        const h3Descendants = new Set<string>()
        h3Descendants.add(h3.id)
        if (h3.children) {
          for (const h4 of h3.children) {
            h2Descendants.add(h4.id)
            h3Descendants.add(h4.id)
          }
        }
        map.set(h3.id, h3Descendants)
      }
    }
    map.set(h2.id, h2Descendants)
  }

  return map
})

function isActive(id: string): boolean {
  return activeId.value === id
}

/**
 * 判断某个 h3 节点的 h4+ 子项是否应该展开
 * 使用防抖后的 activeId，防止快速滚动闪烁
 */
function shouldShowChildren(link: TocLink): boolean {
  const descendants = parentDescendantsMap.value.get(link.id)
  if (!descendants) return false
  return descendants.has(debouncedActiveId.value)
}

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
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

function scrollToFromDrawer(id: string) {
  drawerOpen.value = false
  setTimeout(() => {
    scrollToHeading(id)
  }, 150)
}

// 收集所有层级的 id 用于 IntersectionObserver
function collectAllIds(links: TocLink[]): string[] {
  const ids: string[] = []
  for (const link of links) {
    ids.push(link.id)
    if (link.children) {
      ids.push(...collectAllIds(link.children))
    }
  }
  return ids
}

// Intersection Observer 追踪当前可见标题
let observer: IntersectionObserver | null = null

onMounted(() => {
  const allIds = collectAllIds(props.links)
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
  if (debounceTimer) clearTimeout(debounceTimer)
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

/* h4+ 展开/折叠：使用 CSS transition，避免 Vue Transition 组件造成的闪烁 */
.toc-h4-wrapper {
  transition: max-height 0.3s ease, opacity 0.25s ease;
}
.toc-h4-expanded {
  max-height: 500px;
  opacity: 1;
}
.toc-h4-collapsed {
  max-height: 0;
  opacity: 0;
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
