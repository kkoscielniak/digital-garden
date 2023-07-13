<template>
  <Layout>
    <template #doc-before>
      <div class="vp-doc">
        <h1 v-if="!$frontmatter.customHeader">
          {{ $frontmatter.title }}
          <a 
            class="header-anchor" 
            v-bind:href="path"
          ></a>
        </h1>
      </div>
    </template>
  </Layout>
</template>

<script setup>
import { useRoute } from 'vitepress';
import Theme from 'vitepress/theme'
const Layout = Theme.Layout;
const { path } = useRoute();
</script>