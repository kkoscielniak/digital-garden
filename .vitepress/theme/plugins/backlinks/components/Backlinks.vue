<template>
  <div v-if="backlinks.length" class="backlinks">
    <div class="content">  
      <div class="backlinks-title">{{ backlinks.length }} linked note{{ backlinks.length > 1 ? "s" : "" }}</div>
      <ul>
        <li v-for="backlink in backlinks">
          <a class="backlink" :href="`/` + backlink.path">{{ backlink.title }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useData, useRoute } from "vitepress";
import { Backlink } from "../backlinksCollection";

const { page } = useData();
  const allBacklinks: Backlink[] = page.value["backlinks"];
  let route = useRoute();
  let backlinks: Backlink[] = [];
  
  for (const backlink of allBacklinks) {
    if (`/${backlink.path}` == route.path.replace(".html", "")) {
      // exclude self reference
      continue;
    }
    backlinks.push(backlink);
  }
</script>

<style scoped lang="scss">
.backlinks {
  .content {
    position: relative;
    border-left: 1px solid var(--vp-c-divider);
    padding-left: 16px;
    font-size: 13px;
    font-weight: 500;
  }
  
  .backlinks-title {
    letter-spacing: 0.4px;
    line-height: 28px;
    font-size: 13px;
    font-weight: 600;
  }

  .backlink {
    display: block;
    line-height: 28px;
    color: var(--vp-c-text-2);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: color 0.5s;
    font-weight: 500;

    &:hover {
      color: var(--vp-c-text-1);
      transition: color 0.25s;
    }
  }
}
</style>
