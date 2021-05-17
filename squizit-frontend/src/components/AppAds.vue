<template>
  <div
    class="mx-auto mb-5 max-w-150 grid w-11/12 grid-cols-3"
    :style="`grid-template-columns: repeat(${ads.length}, minmax(0, 1fr))`"
  >
    <div
      v-for="(ad, index) in ads"
      :key="index"
      v-html="ad"
      class="rounded-3xl h-40 shadow-center mx-1 p-3"
    ></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { SquizitInfo } from "../assets/types";

export default defineComponent({
  props: {
    ads: {
      type: Array as PropType<SquizitInfo["ads"]>,
      default: [],
    },
  },
});
</script>
