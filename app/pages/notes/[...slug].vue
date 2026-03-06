<template>
  <article>
    <ContentDoc v-slot="{ doc }">
      <header class="mb-8 border-b border-gray-200 dark:border-white/[0.06] pb-6">
        <h1 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ doc.title }}</h1>
      </header>
      <ContentRenderer :value="doc" class="prose max-w-none" />
    </ContentDoc>
  </article>
</template>
