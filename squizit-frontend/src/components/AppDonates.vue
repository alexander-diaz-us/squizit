<template>
  <div class="text-center">
    <h1 class="text-2xl">Info</h1>
    <p class="text-md" v-html="squizitStore.websiteInfo.info"></p>

    <p class="font-semibold mt-3">You can donate here:</p>

    <div class="flex flex-row mt-2 items-center justify-center">
      <a
        v-for="(address, index) in squizitStore.websiteInfo.address"
        :key="index"
        :href="address.href"
        target="_blank"
        rel="noreferrer"
      >
        <img :alt="address.name" :src="address.icon" class="logo" />
      </a>
    </div>

    <div class="flex flex-col mt-3 justify-center items-center">
      <h1 class="font-semibold">Status:</h1>
      <progress-bar-element
        class="w-full max-w-75"
        :value="squizitStore.websiteInfo.donates.amount"
        :max="squizitStore.websiteInfo.donates.target"
        suffix="€"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useSquizitStore } from "../stores/squizit";
import ProgressBarElement from "./ProgressBarElement.vue";

export default defineComponent({
  components: {
    ProgressBarElement,
  },
  setup() {
    const squizitStore = useSquizitStore();

    return { squizitStore };
  },
});
</script>
