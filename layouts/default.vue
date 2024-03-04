<template>
  <a-layout has-sider class="default navbar-fixed">
    <my-sidebar :collapsed="collapsed" />
    <a-layout :class="{ 'collapse': collapsed }">
      <my-header :collapse="collapsed" @collapse="collapsed = !collapsed" />
      <a-layout-content>
        <NuxtPage />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
const collapsed = ref<boolean>(false)
</script>