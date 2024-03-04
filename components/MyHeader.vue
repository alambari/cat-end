<template>
  <a-affix>
    <a-layout-header>
      <a-row type="flex">
        <a-col :span="24" :md="6">
          <a-button type="link" class="sidebar-toggler" @click="$emit('collapse')">
            <mdi-icon :icon="collapse ? 'mdiClose' : 'mdiMenu'" />
          </a-button>
        </a-col>
        <a-col :span="24" :md="18" class="header-control">
          <a-dropdown placement="bottom">
            <NuxtLink class="btn-sign-in" @click="e => e.preventDefault()">
              <mdi-icon icon="mdiAccountOutline"></mdi-icon>
              <span>Al Ambari</span>
            </NuxtLink>
          </a-dropdown>
        </a-col>
      </a-row>
    </a-layout-header>
  </a-affix>
</template>

<script lang="ts" setup>
defineProps({
  collapse: {
    type: Boolean,
    default: false
  }
})
</script>