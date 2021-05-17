<template>
  <header
    class="flex flex-row mx-auto h-1/12 my-5 mt-10 relative items-center justify-center"
    @mouseover="squish = true"
    @mouseleave="squish = false"
  >
    <h1
      class="font-bold h-max transform text-5xl duration-250 pointer-events-none"
      :class="{
        'scale-y-50 rotate-5': squish,
      }"
      to="/"
    >
      SquizIT
    </h1>
    <h1
      class="transform text-5xl duration-250 absolute pointer-events-none"
      style="left: calc(50% + 5rem)"
      :class="{
        'scale-y-50 rotate-5': squish,
        'opacity-0': !squish,
      }"
    >
      🤏
    </h1>
  </header>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const squish = ref(false);
    return { squish };
  },
});
</script>
