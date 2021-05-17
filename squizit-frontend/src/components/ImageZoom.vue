<template>
  <transition name="fade">
    <div
      v-if="zoomedImage"
      class="z-20 fixed top-0 left-0 w-full h-full bg-dark dark:bg-light !bg-opacity-5"
      @click.self="$emit('close')"
    ></div>
  </transition>
  <transition name="pop">
    <div
      v-if="zoomedImage"
      class="z-30 bg-light rounded-3xl shadow-center p-5 transform top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 fixed dark:bg-dark"
    >
      <button
        class="bg-light rounded-full font-extrabold shadow-center py-1 px-2 top-3 right-3 text-3xl z-10 duration-250 absolute fixed material-icons dark:bg-dark hover:bg-red-300 hover:text-dark outline-none focus:outline-none active:bg-red-400"
        @click="$emit('close')"
      >
        close
      </button>

      <img class="rounded-xl filter-drop-shadow" :src="zoomedImage" />
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  emits: {
    close() {
      return true;
    },
  },
  props: {
    zoomedImage: {
      type: String,
      default: "",
    },
  },
});
</script>
