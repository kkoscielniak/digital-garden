<template>
  <div v-if="backlinks.length" class="backlinks">
    <div class="content">
      <div class="backlinks-title">
        {{ backlinks.length }} linked note{{ backlinks.length > 1 ? "s" : "" }}
      </div>
      <ul>
        <li v-for="backlink in backlinks">
          <a class="backlink" :href="`/` + backlink.path">{{
            backlink.title
          }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vitepress";
import { data as backlinksCollection } from "../../../backlinks.data";

const route = useRoute();
const backlinks =
  backlinksCollection.data[route.path.replace(".html", "").slice(1)] || [];
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
