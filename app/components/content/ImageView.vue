<template>
  <figure class="my-6 not-prose" :class="align === 'center' ? 'text-center' : ''">
    <div
      class="inline-block relative overflow-hidden rounded-lg cursor-pointer group"
      :class="widthClass"
      @click="openLightbox"
    >
      <img
        :src="src"
        :alt="alt || ''"
        loading="lazy"
        class="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.02]"
      />
      <!-- 放大图标 -->
      <div class="absolute top-2 right-2 p-1.5 rounded-full bg-black/40 text-white/80 opacity-0 group-hover:opacity-100 transition-opacity">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
        </svg>
      </div>
    </div>
    <figcaption v-if="$slots.default || caption" class="mt-2 text-sm text-gray-500 dark:text-gray-400">
      <slot>{{ caption }}</slot>
    </figcaption>

    <!-- Lightbox -->
    <Teleport to="body">
      <Transition name="lb">
        <div
          v-if="open"
          class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm cursor-pointer"
          @click="closeLightbox"
        >
          <button
            class="absolute top-4 right-4 z-10 p-2 text-white/80 hover:text-white transition-colors"
            @click="closeLightbox"
          >
            <svg class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <img
            :src="src"
            :alt="alt || ''"
            class="max-w-[90vw] max-h-[85vh] object-contain select-none"
            @click.stop
          />
        </div>
      </Transition>
    </Teleport>
  </figure>
</template>

<script setup lang="ts">
const props = defineProps<{
  src: string
  alt?: string
  caption?: string
  width?: string
  align?: 'left' | 'center' | 'right'
}>()

const open = ref(false)

const widthClass = computed(() => {
  if (props.width === 'full') return 'w-full'
  if (props.width === 'half') return 'w-full sm:w-1/2'
  if (props.width === 'third') return 'w-full sm:w-1/3'
  return 'w-full'
})

function openLightbox() {
  open.value = true
  document.body.style.overflow = 'hidden'
}

function closeLightbox() {
  open.value = false
  document.body.style.overflow = ''
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && open.value) closeLightbox()
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.lb-enter-active,
.lb-leave-active {
  transition: opacity 0.3s ease;
}
.lb-enter-from,
.lb-leave-to {
  opacity: 0;
}
</style>
