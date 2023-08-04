<template>
  <div class="vp-doc">
    <h1 v-if="!$frontmatter.customHeader">
      {{ $frontmatter.title }}
      <a class="header-anchor" href="#"></a>
    </h1>
  </div>
</template>

<script setup />