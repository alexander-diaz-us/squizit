<template>
  <div class="rounded-full h-6 shadow-center relative overflow-hidden">
    <div class="h-full bg-gray-200 w-full absolute"></div>
    <div
      class="h-full duration-350 absolute"
      :class="{
        'bg-green-500': percentage < 100,
        'bg-yellow-300': percentage >= 100,
      }"
      :style="`width: ${percentage}%`"
    ></div>
    <p
      class="text-dark transform top-1/2 left-1/2 z-20 -translate-y-1/2 -translate-x-1/2 absolute"
    >
      {{ value }}/{{ max }}{{ suffix }}
    </p>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

export default defineComponent({
  props: {
    value: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 100,
    },
    suffix: {
      type: String,
      default: "%",
    },
  },
  setup(props) {
    const percentage = computed(() => props.value / (props.max / 100));
    return { percentage };
  },
});
</script>
