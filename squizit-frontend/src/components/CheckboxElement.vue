<template>
  <div class="flex items-center cursor-pointer" @click="toggle">
    <div
      class="flex duration-250 text-dark items-center justify-center shadow-center w-6 h-6 p-5 m-3 rounded-2xl material-icons select-none"
      :class="{
        'bg-green-400 hover:bg-green-300 active:bg-green-400': enabled,
        'bg-red-400 hover:bg-red-300 active:bg-red-400': !enabled,
      }"
    >
      {{ enabled ? "check" : "close" }}
    </div>
    <p class="text-xl select-none">{{ label }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  emits: {
    toggle(property: string, bool: boolean) {
      return typeof property === "string" && typeof bool === "boolean";
    },
  },
  props: {
    label: {
      type: String,
      default: "",
    },
    default: {
      type: Boolean,
    },
    property: {
      type: String,
    },
  },
  setup(props, { emit }) {
    const enabled = ref(props.default);

    const toggle = () => {
      enabled.value = !enabled.value;
      emit("toggle", props.property, enabled.value);
    };

    return { enabled, toggle };
  },
});
</script>
