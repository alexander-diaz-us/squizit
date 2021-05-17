<template>
  <div v-if="fetching && !fetched" class="text-center">
    <span
      class="text-dark text-center animate-spin text-6xl material-icons pointer-events-none select-none dark:text-light"
    >
      donut_large
    </span>
    <br />
    <p class="text-4xl">Getting answers</p>
  </div>
  <div v-else-if="fetched && !check" class="text-center">
    <span
      class="text-red-500 text-6xl material-icons pointer-events-none select-none"
    >
      cancel
    </span>
    <br />
    <span class="text-4xl">
      {{ errorTitle }} <br />
      <p class="text-sm">{{ errorMessage }}</p>
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    fetching: {
      type: Boolean,
      default: false,
    },
    fetched: {
      type: Boolean,
      default: false,
    },
    check: {
      type: Boolean,
      default: false,
    },
    errorTitle: {
      type: String,
      default: "",
    },
    errorMessage: {
      type: String,
      default: "",
    },
  },
});
</script>
