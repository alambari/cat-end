<template>
  <a-button v-bind="$props" @click="onClickBtn">
    <slot>
      {{ title }}
    </slot>
  </a-button>
</template>

<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String
  },
  to: {
    type: Object,
    required: true,
  }
})

const onClickBtn = () => {
  navigateTo(props.to)
}

</script>