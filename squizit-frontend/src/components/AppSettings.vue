<template>
  <transition name="fade">
    <div
      v-if="show"
      class="z-20 fixed top-0 left-0 w-full h-full bg-dark dark:bg-light !bg-opacity-5"
      @click.self="$emit('close')"
    ></div>
  </transition>

  <transition name="pop">
    <div
      v-if="show"
      class="z-30 rounded-3xl shadow-center fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 max-w-160 h-1/2 bg-light dark:bg-dark"
    >
      <checkbox-element
        label="Dark mode"
        property="darkMode"
        :default="settingsStore.darkMode"
        @toggle="setProperty"
      />
      <checkbox-element
        label="Force showing answers"
        property="forceShowingAnswers"
        :default="settingsStore.forceShowingAnswers"
        @toggle="setProperty"
      />
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, watch } from "vue";
import { useSettingsStore } from "../stores/settings";
import CheckboxElement from "./CheckboxElement.vue";

export default defineComponent({
  components: {
    CheckboxElement,
  },
  emits: {
    close() {
      return true;
    },
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const settingsStore = useSettingsStore();

    const setProperty = (
      property: keyof typeof settingsStore.$state,
      value: any
    ) => (settingsStore[property] = value);

    const updateDarkMode = () => {
      if (settingsStore.darkMode)
        document.firstElementChild?.classList.add("dark");
      else document.firstElementChild?.classList.remove("dark");
    };

    let localSettings: any = localStorage.getItem("settings");
    if (localSettings) {
      try {
        localSettings = JSON.parse(localSettings);
        settingsStore.$state = {
          ...settingsStore.$state,
          ...localSettings,
        };
      } catch {
        localStorage.removeItem("settings");
      }
    }

    updateDarkMode();

    watch(settingsStore.$state, () => {
      localStorage.setItem("settings", JSON.stringify(settingsStore.$state));
      updateDarkMode();
    });

    return { settingsStore, setProperty };
  },
});
</script>
