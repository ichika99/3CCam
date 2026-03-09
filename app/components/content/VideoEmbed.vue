<template>
  <figure class="my-6 not-prose">
    <div class="relative overflow-hidden rounded-lg shadow-lg bg-black group">
      <!-- 视频元素 -->
      <video
        ref="videoRef"
        :src="src"
        :poster="poster"
        :autoplay="autoplay"
        :loop="loop"
        :muted="muted || autoplay"
        playsinline
        webkit-playsinline
        x5-playsinline
        x5-video-player-type="h5"
        preload="metadata"
        class="w-full block"
        @loadedmetadata="onMetadata"
        @play="playing = true"
        @pause="playing = false"
        @ended="playing = false"
        @timeupdate="onTimeUpdate"
        @click="togglePlay"
      />

      <!-- 自定义播放按钮覆盖层（未播放时显示） -->
      <div
        v-if="!playing && !autoplay"
        class="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer transition-opacity"
        @click="togglePlay"
      >
        <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/90 dark:bg-white/80 flex items-center justify-center shadow-xl backdrop-blur-sm transition-transform group-hover:scale-110">
          <svg class="w-8 h-8 sm:w-10 sm:h-10 text-gray-800 ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>

      <!-- 底部控制栏 -->
      <div class="absolute bottom-0 left-0 right-0 px-3 py-2 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
        <!-- 进度条 -->
        <div
          class="w-full h-1 bg-white/30 rounded-full cursor-pointer mb-2"
          @click="seek"
        >
          <div
            class="h-full bg-primary-400 rounded-full transition-all"
            :style="{ width: `${progress}%` }"
          />
        </div>
        <div class="flex items-center justify-between text-white text-xs">
          <span>{{ formatTime(currentTime) }} / {{ formatTime(duration) }}</span>
          <div class="flex items-center gap-2">
            <!-- 全屏按钮 -->
            <button
              class="p-1 hover:text-primary-300 transition-colors"
              title="全屏"
              @click.stop="toggleFullscreen"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 说明文字 -->
    <figcaption v-if="$slots.default || caption" class="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
      <slot>{{ caption }}</slot>
    </figcaption>
  </figure>
</template>

<script setup lang="ts">
const props = defineProps<{
  src: string
  poster?: string
  caption?: string
  autoplay?: boolean
  loop?: boolean
  muted?: boolean
}>()

const videoRef = ref<HTMLVideoElement | null>(null)
const playing = ref(false)
const currentTime = ref(0)
const duration = ref(0)
const progress = ref(0)

function onMetadata() {
  if (videoRef.value) {
    duration.value = videoRef.value.duration
  }
}

function onTimeUpdate() {
  if (videoRef.value) {
    currentTime.value = videoRef.value.currentTime
    progress.value = duration.value > 0 ? (currentTime.value / duration.value) * 100 : 0
  }
}

function togglePlay() {
  if (!videoRef.value) return
  if (videoRef.value.paused) {
    videoRef.value.play()
  } else {
    videoRef.value.pause()
  }
}

function seek(e: MouseEvent) {
  if (!videoRef.value || !duration.value) return
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
  const ratio = (e.clientX - rect.left) / rect.width
  videoRef.value.currentTime = ratio * duration.value
}

function toggleFullscreen() {
  if (!videoRef.value) return
  // iOS Safari 使用 webkitEnterFullscreen
  if ((videoRef.value as any).webkitEnterFullscreen) {
    (videoRef.value as any).webkitEnterFullscreen()
  } else if (videoRef.value.requestFullscreen) {
    videoRef.value.requestFullscreen()
  }
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}
</script>
