<template>
  <figure class="my-6 not-prose">
    <div class="grid gap-2" :class="gridColsClass">
      <div
        v-for="(img, i) in images"
        :key="i"
        class="relative overflow-hidden rounded-lg cursor-pointer group"
        @click="openLightbox(i)"
      >
        <img
          :src="img.src"
          :alt="img.alt || ''"
          loading="lazy"
          class="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
      </div>
    </div>
    <figcaption v-if="caption" class="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
      {{ caption }}
    </figcaption>

    <!-- Lightbox 灯箱 -->
    <Teleport to="body">
      <Transition name="lightbox">
        <div
          v-if="lightboxOpen"
          class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm"
          @click.self="closeLightbox"
        >
          <!-- 关闭按钮 -->
          <button
            class="absolute top-4 right-4 z-10 p-2 text-white/80 hover:text-white transition-colors"
            @click="closeLightbox"
          >
            <svg class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- 上一张 -->
          <button
            v-if="images.length > 1"
            class="absolute left-2 sm:left-4 z-10 p-2 text-white/80 hover:text-white transition-colors"
            @click.stop="prev"
          >
            <svg class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <!-- 图片 -->
          <img
            :src="images[activeIndex]?.src"
            :alt="images[activeIndex]?.alt || ''"
            class="max-w-[90vw] max-h-[85vh] object-contain select-none"
            @click.stop
          />

          <!-- 下一张 -->
          <button
            v-if="images.length > 1"
            class="absolute right-2 sm:right-4 z-10 p-2 text-white/80 hover:text-white transition-colors"
            @click.stop="next"
          >
            <svg class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <!-- 计数器 -->
          <div v-if="images.length > 1" class="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 text-sm">
            {{ activeIndex + 1 }} / {{ images.length }}
          </div>
        </div>
      </Transition>
    </Teleport>
  </figure>
</template>

<script setup lang="ts">
interface ImageItem {
  src: string
  alt?: string
}

const props = defineProps<{
  cols?: number
  caption?: string
  images?: ImageItem[]
}>()

const slots = useSlots()
const lightboxOpen = ref(false)
const activeIndex = ref(0)

// 从 props.images 或 slot 中解析图片
const images = computed<ImageItem[]>(() => {
  if (props.images && props.images.length > 0) return props.images

  // 从 slot 中解析 img 元素（MDC 场景）
  const slotContent = slots.default?.()
  if (!slotContent) return []

  const result: ImageItem[] = []
  function extractImages(vnodes: any[]) {
    for (const vnode of vnodes) {
      if (vnode.type === 'img' || (vnode.props && vnode.props.src)) {
        result.push({
          src: vnode.props?.src || '',
          alt: vnode.props?.alt || '',
        })
      }
      if (vnode.children && Array.isArray(vnode.children)) {
        extractImages(vnode.children)
      }
    }
  }
  extractImages(slotContent)
  return result
})

const gridColsClass = computed(() => {
  const c = props.cols || Math.min(images.value.length, 3)
  const map: Record<number, string> = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-2 sm:grid-cols-2 lg:grid-cols-4',
  }
  return map[c] || `grid-cols-1 sm:grid-cols-2 lg:grid-cols-${c}`
})

function openLightbox(index: number) {
  activeIndex.value = index
  lightboxOpen.value = true
  document.body.style.overflow = 'hidden'
}

function closeLightbox() {
  lightboxOpen.value = false
  document.body.style.overflow = ''
}

function prev() {
  activeIndex.value = (activeIndex.value - 1 + images.value.length) % images.value.length
}

function next() {
  activeIndex.value = (activeIndex.value + 1) % images.value.length
}

// 键盘导航
function onKeydown(e: KeyboardEvent) {
  if (!lightboxOpen.value) return
  if (e.key === 'Escape') closeLightbox()
  if (e.key === 'ArrowLeft') prev()
  if (e.key === 'ArrowRight') next()
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 0.3s ease;
}

.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}
</style>
