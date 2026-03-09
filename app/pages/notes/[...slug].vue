<template>
  <ContentDoc v-slot="{ doc }">
    <div class="article-with-toc relative">
      <article class="article-content min-w-0">
        <header class="mb-6 sm:mb-8 border-b border-gray-200 dark:border-white/[0.06] pb-4 sm:pb-6">
          <h1 class="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ doc.title }}</h1>
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
