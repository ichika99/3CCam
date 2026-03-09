<template>
  <ContentDoc v-slot="{ doc }">
    <div class="article-with-toc relative">
      <article class="article-content min-w-0">
        <header class="mb-6 sm:mb-8 border-b border-gray-200 dark:border-white/[0.06] pb-4 sm:pb-6">
          <div class="mb-3 flex flex-wrap items-center gap-2 text-xs">
            <span
              v-if="doc.status"
              class="inline-flex items-center rounded-full px-2 py-0.5 font-medium"
              :class="{
                'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400': doc.status === 'published',
                'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400': doc.status === 'in-progress',
                'bg-gray-100 text-gray-500 dark:bg-gray-500/10 dark:text-gray-400': doc.status === 'draft',
              }"
            >
              {{ doc.status === 'published' ? '已发布' : doc.status === 'in-progress' ? '进行中' : '草稿' }}
            </span>
          </div>
          <h1 class="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ doc.title }}</h1>
          <p v-if="doc.description" class="mt-2 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{{ doc.description }}</p>
          <div v-if="doc.tags" class="mt-3 flex flex-wrap gap-1.5">
            <span
              v-for="tag in doc.tags"
              :key="tag"
              class="text-xs text-gray-400 dark:text-gray-500"
            >
              #{{ tag }}
            </span>
          </div>
        </header>

        <!-- 移动端 TOC -->
        <TableOfContents :links="tocLinks" mode="mobile" />

        <ContentRenderer :value="doc" class="prose max-w-none" />
      </article>

      <!-- 桌面端右侧 TOC -->
      <TableOfContents :links="tocLinks" mode="desktop" />
    </div>
  </ContentDoc>
</template>

<script setup lang="ts">
interface TocLink {
  id: string
  text: string
  depth: number
  children?: TocLink[]
}

const { data: doc } = await useAsyncData('toc-' + useRoute().path, () =>
  queryContent(useRoute().path).findOne()
)

const tocLinks = computed<TocLink[]>(() => {
  if (!doc.value?.body?.toc?.links) return []
  return doc.value.body.toc.links
})
</script>

<style scoped>
.article-with-toc {
  display: flex;
  gap: 2rem;
}

.article-content {
  flex: 1;
  min-width: 0;
}

@media (min-width: 1280px) {
  .article-with-toc > .toc {
    width: 220px;
    flex-shrink: 0;
  }
}
</style>
