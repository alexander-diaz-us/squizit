<template>
  <app-header />

  <main class="center">
    <router-view />
  </main>

  <app-ads :ads="squizitStore.websiteInfo.ads" />

  <app-footer />
</template>

<script lang="ts">
import { defineComponent, watch } from "vue";
import { SquizitInfo } from "./assets/types";
import AppAds from "./components/AppAds.vue";
import AppFooter from "./components/AppFooter.vue";
import AppHeader from "./components/AppHeader.vue";
import { useSquizitStore } from "./stores/squizit";

export default defineComponent({
  components: {
    AppFooter,
    AppHeader,
    AppAds,
  },
  setup() {
    const squizitStore = useSquizitStore();

    let localData: any = localStorage.getItem("squizit");
    if (localData) {
      try {
        localData = JSON.parse(localData);
        squizitStore.$state = {
          ...squizitStore.$state,
          ...localData,
        };
      } catch {
        localStorage.removeItem("settings");
      }
    }

    watch(squizitStore.$state, () => {
      localStorage.setItem("squizit", JSON.stringify(squizitStore.$state));
    });

    fetch("https://mrcyjanek.net/projects/squizit/info.json")
      .then((res) => res.json())
      .then((json: SquizitInfo) => (squizitStore.websiteInfo = json))
      .catch(console.warn);

    return {
      squizitStore,
    };
  },
});
</script>

<style scoped>
.center {
  min-height: calc(91.667% - 22.5rem);
  @media (min-width: 640px) {
    min-height: calc(91.667% - 18.75rem);
  }
}
</style>
