<template>
  <Layout>
    <template #doc-before>
      {{ allBacklinks }}
      <div class="vp-doc">
        <h1 v-if="!$frontmatter.customHeader">
          {{ $frontmatter.title }}

          <a class="header-anchor" href="#"></a>
        </h1>
      </div>
    </template>
    <template #doc-after>
      
    </template>
  </Layout>
</template>

<script setup>
import {reactive} from 'vue'
import Theme from "vitepress/theme";
import { useData, useRoute } from "vitepress";
import { watch } from "vue";
const Layout = Theme.Layout;

const route = useRoute()
const state = reactive({ key: route.path })

watch(() => route.path, (path) => state.key = path)

const { page } = useData();
const allBacklinks = page.value.backlinks//.reverse();
// console.log(allBacklinks);

</script>
