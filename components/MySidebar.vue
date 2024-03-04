<template>
  <a-layout-sider collapsible theme="light" breakpoint="lg" width="260px" class="sider-primary fixed"
    :collapsed="collapsed" :trigger="null">
    <div class="logo">
      <img src="/img/guzel.png" alt="logo guzel" />
    </div>
    <a-menu theme="light" mode="inline" v-model:selected-keys="stateSidebar.selectedItem"
      :open-keys="stateSidebar.openKeys">
      <template v-for="(menu, index) in stateSidebar.menus" :key="index">
        <a-menu-item :key="menu.path" v-if="!menu.subMenu">
          <NuxtLink :to="menu.path" class="menu-link">
            <mdi-icon class="menu-icon" :icon="menu.icon" />
            <span class="menu-label">{{ menu.name }}</span>
          </NuxtLink>
        </a-menu-item>
        <template v-else>
          <a-sub-menu :key="menu.path">
            <template #title>
              <div class="menu-link">
                <mdi-icon class="menu-icon" :icon="menu.icon" />
                <span class="menu-label">{{ menu.name }}</span>
              </div>
            </template>
            <template v-for="submenu in menu.subMenu">
              <a-menu-item v-model:key="submenu.path">
                <NuxtLink :to="`${menu.path}${submenu.path}`" class="menu-link">
                  <mdi-icon class="menu-icon" :icon="submenu?.icon" />
                  <span class="menu-label">{{ submenu.name }}</span>
                </NuxtLink>
              </a-menu-item>
            </template>
          </a-sub-menu>
        </template>
      </template>
    </a-menu>
  </a-layout-sider>
</template>

<script lang="ts" setup>
import { isEmpty } from 'underscore'
const route = useRoute();

defineProps({
  collapsed: {
    type: Boolean,
    default: false,
  }
})

const isLoading = ref<boolean>(false)
const stateSidebar = reactive<iSidebar>({
  menus: [],
  selectedItem: [],
  openKeys: []
})

const fetchMenu = async () => {
  isLoading.value = true

  const { data, error } = await useFetch('/api/app/menu')

  isLoading.value = false

  stateSidebar.menus = data.value as any
}

onBeforeMount(() => {
  fetchMenu();

  const menus: any = {}

  stateSidebar.menus.find((menu: iMenus) => {
    if (menu.path === route.path) {
      Object.assign(menus, menu);
      return;
    }

    if (menu?.subMenu) {
      menu.subMenu.find((submenu: iMenu) => {
        if (`${menu.path}${submenu.path}` == route.path) {
          Object.assign(menus, { ...menu, subMenu: submenu });
          return;
        }
      })
    }
  })

  if (!isEmpty(menus)) {
    stateSidebar.selectedItem?.push(menus.path, menus?.subMenu?.path)
    stateSidebar.openKeys?.push(menus.path)
  }
})
</script>